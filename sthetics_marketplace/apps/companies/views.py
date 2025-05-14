from rest_framework import viewsets
from .models import *
from .serializers import *
from rest_framework.permissions import IsAuthenticated

# Crud de ciudades
class CityViewSet(viewsets.ModelViewSet):
    queryset = City.objects.all()
    serializer_class = CitySerializer
    permission_classes = [IsAuthenticated] 

# Crud de las localizaciones del local
class LocationViewSet(viewsets.ModelViewSet):
    queryset = Location.objects.all()
    serializer_class = LocationSerializers
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        # Asignamos local al usuario
        serializer.save(owner=self.request.user)
