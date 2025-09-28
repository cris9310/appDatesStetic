from rest_framework import viewsets, permissions
from rest_framework.exceptions import PermissionDenied

from rest_framework import generics
from rest_framework.response import Response

from django.shortcuts import render


from .models import Service
from .serializers import *


#Pequeño mixin para que solo acceda a a crear servicios el dueño del local
class IsProfessionalOwner(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        return obj.location.owner == request.user


#Creamos el crud del modelo de los servicios
class ServiceViewSet(viewsets.ModelViewSet):
    queryset = Service.objects.all()
    serializer_class = serviceSerializer

    def get_permissions(self):
        if self.action in ['create', 'update', 'partial_update', 'destroy']:
            return [permissions.IsAuthenticated(), IsProfessionalOwner()]
        return [permissions.AllowAny()]

    def perform_create(self, serializer):
        location = serializer.validated_data.get("location")
        if location.owner != self.request.user:
            raise PermissionDenied("No puedes crear servicios en un local que no te pertenece.")
        serializer.save()

    def get_queryset(self):
        queryset = super().get_queryset()
        location_id = self.kwargs.get("location_id")
        if location_id:
            queryset = queryset.filter(location=location_id)
        return queryset
    