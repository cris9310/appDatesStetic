from rest_framework import serializers

from django.utils import timezone
from datetime import timedelta

from .models import User

#Nos sirve para mostrar la información del usuario, quitando los datos sensibles como la contraseña
class UserSerializer(serializers.ModelSerializer):
    active_role = serializers.CharField(read_only=True)

    class Meta:
        model = User
        fields = ['id', 'email', 'name', 'phone','role','profile_image','active_role']
        


#nos sirve para registrar a clientes nuevos
class ClientRegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only = True)

    class Meta:
        model=User
        fields = ['email', 'name','phone', 'password','profile_image']

    def create(self, validated_data):
        password = validated_data.pop('password')
        user = User.objects.create(**validated_data)
        user.set_password(password)
        user.role='Client'
        user.save()
        return user

class ProfessionalRegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only = True)

    class Meta:
        model=User
        fields = ['email', 'name','phone', 'password','profile_image']

    def create(self, validated_data):
        password = validated_data.pop('password')
        user = User.objects.create(**validated_data)
        user.set_password(password)

        user.trial_start_date = timezone.now().date()
        user.trial_end_date = timezone.now().date() + timedelta(days=14)
        user.role = 'Professional'
        user.save()
        return user


class ChangePasswordSerializer(serializers.Serializer):
    old_password =serializers.CharField(required = True)
    new_password =serializers.CharField(required = True)