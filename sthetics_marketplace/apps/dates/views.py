from rest_framework import generics, permissions, status
from rest_framework.response import Response
from .models import Appointment
from .serializers import *
from django.utils import timezone
from django.shortcuts import get_object_or_404


#Vista que nos sirve para listar y crear citas
class AppointmentListCreateView(generics.ListCreateAPIView):
    serializer_class = AppointmentSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        if user.role == 'client':
            return Appointment.objects.filter(client=user)
        elif user.role == 'professional':
            return Appointment.objects.filter(professional=user)
        return Appointment.objects.none()

    def perform_create(self, serializer):
        # Validar que la fecha no sea en el pasado
        datetime = serializer.validated_data.get('datetime')
        if datetime < timezone.now():
            raise serializers.ValidationError({"datetime": "No puedes agendar citas en el pasado."})
        
        # Asignar automáticamente el cliente si es quien crea la cita
        if self.request.user.role == 'client':
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