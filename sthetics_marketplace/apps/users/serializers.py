from rest_framework import serializers


from .models import User

#Nos sirve para mostrar la información del usuario, quitando los datos sensibles como la contraseña
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'email', 'name', 'role', 'phone', 'profile_image']
        


#nos sirve para registrar a clientes nuevos
class ClientRegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only = True)

    class Meta:
        model=User
        fields = ['email', 'name','phone', 'password']

    def create(self, validated_data):
        validated_data['role'] = 'client'
        user  =  User.objects.create_user(**validated_data)
        return user

#nos sirve para registrar a clientes nuevos
class ClientRegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only = True)

    class Meta:
        model=User
        fields = ['email', 'name','phone', 'password']

    def create(self, validated_data):
        validated_data['role'] = 'client'
        user  =  User.objects.create_user(**validated_data)
        return user

class ProfessionalRegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only = True)

    class Meta:
        model=User
        fields = ['email', 'name','phone', 'password']

    def create(self, validated_data):
        validated_data['role'] = 'Professional'
        user  =  User.objects.create_user(**validated_data)
        return user


class ChangePasswordSerializer(serializers.Serializer):
    old_password =serializers.CharField(required = True)
    new_password =serializers.CharField(required = True)