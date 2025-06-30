from rest_framework import generics, permissions, status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.views import TokenObtainPairView

from .models import User
from .serializers import *


#Vista para registrar clientes
class RegisterClientView(generics.CreateAPIView):
    queryset =  User.objects.all()
    serializer_class = ClientRegisterSerializer
    permission_classes = [permissions.AllowAny]

#Vista para registrar profesionales 
class RegisterProfessionalView(generics.CreateAPIView):
    queryset =  User.objects.all()
    serializer_class = ProfessionalRegisterSerializer
    permission_classes = [permissions.AllowAny]


#Esta vista es del login usando simpleJWT
class LoginView(TokenObtainPairView):
    permission_classes =[permissions.AllowAny]

#Esta vista sirve para ver el detalle del usuario
class ProfileView(generics.RetrieveAPIView):
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self):
        return self.request.user



#Listamos los usuarios que son profesionales
class ProfessionalListView(generics.ListAPIView):
    serializer_class = UserSerializer
    permission_classes = [permissions.AllowAny]

    def get_queryset(self):
        return User.objects.filter(role='Professional', is_active=True)
    

# Vemos el detalle de los profesionales seleccionados
class ProfessionalDetailView(generics.RetrieveAPIView):
    serializer_class = UserSerializer
    permission_classes = [permissions.AllowAny]
    queryset = User.objects.filter(role='Professional', is_active=True)
    lookup_field = 'id'

# Eliminar cuenta
class DeleteAccountView(generics.DestroyAPIView):
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self):
        return self.request.user
    
# Actualizar perfil
class UpdateProfileView(generics.UpdateAPIView):
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self):
        return self.request.user

class ChangePasswordView(APIView):
    serializer_class = ChangePasswordSerializer
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, *args, **kwargs):
        serializer = ChangePasswordSerializer(data = request.data)
        if serializer.is_valid():
            user = request.user
            if not user.check_password(serializer.data.get('old_password')):
                return Response({"old_password": ["Contraseña antigua incorrecta."]}, status=status.HTTP_400_BAD_REQUEST)
            user.set_password(serializer.data.get('new_password'))
            user.save()
            return Response({"detail": "Contraseña cambiada correctamente."})
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)