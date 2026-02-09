from rest_framework import viewsets
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.generics import GenericAPIView, ListAPIView, CreateAPIView
from rest_framework.response import Response
from rest_framework import status


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
    permission_classes = [IsAuthenticated]

class LocationViewSetMobileApp(CreateAPIView):
    serializer_class = LocationSerializersMobileApp
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        # Los datos pueden llegar como multipart/form-data
        serializer = LocationSerializersMobileApp(data=request.data)
        if serializer.is_valid():
            locationBusiness = serializer.save()
            serializer_response = self.serializer_class(locationBusiness, context={'request': request})

            return Response(
                {"message": "Datos recibidos", "data": serializer_response.data},
                status=status.HTTP_201_CREATED
            )
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class LocationListUserViewSet(ListAPIView):
    queryset = Location.objects.all()
    serializer_class = LocationSerializers
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Location.objects.filter(owner =user)


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