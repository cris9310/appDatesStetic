from rest_framework import viewsets
from rest_framework.permissions import AllowAny
from rest_framework.generics import GenericAPIView
from rest_framework.response import Response


from .models import *
from .serializers import *

# Crud de ciudades
class CityViewSet(viewsets.ModelViewSet):
    queryset = City.objects.all()
    serializer_class = CitySerializer
    permission_classes = [AllowAny]

# Crud de las localizaciones del local
class LocationViewSet(viewsets.ModelViewSet):
    queryset = Location.objects.all()
    serializer_class = LocationSerializers
    permission_classes = [AllowAny] 
    #permission_classes = [IsAuthenticated] modificar esto mas adelante

    def perform_create(self, serializer):
        # Asignamos local al usuario
        serializer.save(owner=self.request.user)

class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    permission_classes = [AllowAny] 


class VerifiedFormsViewSet(GenericAPIView):
    serializer_class = VerificationQuerySerializer

    def get(self, request):
        email = request.query_params.get('email', None)
        nit = request.query_params.get('nit', None)
        phone_business = request.query_params.get('phone_business', None)
        phone = request.query_params.get('phone', None)

        if email:
           exists = User.objects.filter(email=email).exists()
        elif nit:
            exists = Location.objects.filter(nit=nit).exists()
        elif phone_business:
            exists = Location.objects.filter(phone_business=phone_business).exists()
        else:
            exists = User.objects.filter(phone=phone).exists()

        return Response({'exists': exists})