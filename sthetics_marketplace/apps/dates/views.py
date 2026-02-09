from rest_framework import generics, permissions, status
from rest_framework.response import Response
from .models import Appointment
from .serializers import *
from apps.services.models import Service
from apps.companies.models import Location
from django.utils import timezone
from rest_framework.generics import GenericAPIView
from datetime import datetime, timedelta, time
from django.utils.dateparse import parse_date


#Vista que nos sirve para listar y crear citas
class AppointmentListCreateView(generics.ListCreateAPIView):
    serializer_class = AppointmentSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        if user.role == 'Client':
            return Appointment.objects.filter(client=user)
        elif user.role == 'Professional':
            local_id = self.request.query_params.get('id')
            return Appointment.objects.filter(professional=user, location=local_id )
        return Appointment.objects.none()

    def perform_create(self, serializer):
        # Validar que la fecha no sea en el pasado
        datetime = serializer.validated_data.get('datetime')
        if datetime < timezone.now():
            raise serializers.ValidationError({"datetime": "No puedes agendar citas en el pasado."})
        
        # Asignar automáticamente el cliente si es quien crea la cita
        if self.request.user.role == 'Client':
            serializer.save(client=self.request.user)
        else:
            serializer.save()


#Esta vista nos sirve para actualizar y eliminar las citas
class AppointmentRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Appointment.objects.all()
    serializer_class = AppointmentSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_update(self, serializer):
        instance = self.get_object()
        user = self.request.user

        # Solo el cliente/profesional asociado puede modificar la cita
        if user not in [instance.client, instance.professional]:
            return Response({"detail": "No tienes permiso para editar esta cita."}, status=status.HTTP_403_FORBIDDEN)

        # Validar cambios de estado (ej: cancelar)
        new_status = serializer.validated_data.get('status', instance.status)
        if new_status == 'Cancelado' and instance.status != 'Cancelado':
            serializer.save(status='Cancelado')
        else:
            serializer.save()

    def perform_destroy(self, instance):
        user = self.request.user
        # Solo el cliente/profesional puede cancelar (eliminar lógicamente)
        if user not in [instance.client, instance.professional]:
            return Response({"detail": "No tienes permiso para cancelar esta cita."}, status=status.HTTP_403_FORBIDDEN)
        instance.status = 'Cancelado'
        instance.save()

class LocationAvailabilityView(GenericAPIView):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = AvailabilitySlotSerializer

    def get(self, request, location_id, service_id, dateFilter):
        datefilter = parse_date(dateFilter)
        if not datefilter:
            return Response(
                {"error": "Formato de fecha inválido"},
                status=400
            )

        try:
            location = Location.objects.get(id=location_id)
            service = Service.objects.get(id=service_id)
        except Location.DoesNotExist:
            return Response({"error": "Local no existe"}, status=404)
        except Service.DoesNotExist:
            return Response({"error": "Servicio no existe"}, status=404)

        if service.location != location:
            return Response(
                {"error": "El servicio no pertenece a este local"},
                status=400
            )

        if datefilter < timezone.now().date():
            return Response(
                {"error": "No puede seleccionar una fecha del pasado"},
                status=400
            )

        availabilities = self._generate_availabilities(
            location, service, datefilter
        )

        return Response(availabilities)

    def _generate_availabilities(self, location, service, datefilter):

        available_days = [
            int(d) for d in location.available_days.split(",")
            if d.isdigit()
        ]

        if datefilter.weekday() not in available_days:
            return []

        return self._generate_day_slots(
            datefilter,
            location,
            service.duration_minutes
        )

    def _generate_day_slots(self, date, location, service_duration):
        
        slots = []

        opening = timezone.make_aware(
            datetime.combine(date, location.opening_time)
        )
        closing = timezone.make_aware(
            datetime.combine(date, location.closing_time)
        )

        if closing < timezone.now():
            return []

        reserved = Appointment.objects.filter(
            location=location,
            datetime__date=date,
            status__in=["Pendiente", "Completado"]
        )

        reserved_ranges = [
            (a.datetime,
            a.datetime + timedelta(minutes=a.service.duration_minutes))
            for a in reserved
        ]

        current = opening

        while current + timedelta(minutes=service_duration) <= closing:
            slot_end = current + timedelta(minutes=service_duration)

            available = True
            for start, end in reserved_ranges:
                if not (slot_end <= start or current >= end):
                    available = False
                    break

            slots.append({
                "datetime": current,
                "available": available,
                "duration_minutes": service_duration
            })

            current += timedelta(minutes=30)

        return slots