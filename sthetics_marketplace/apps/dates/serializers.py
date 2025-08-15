from rest_framework import serializers

from .models import *
from apps.services.serializers import serviceSerializer
from apps.users.serializers import UserSerializer

from django.contrib.auth import get_user_model


User = get_user_model()
class AppointmentSerializer(serializers.ModelSerializer):

    #Esta parte nos ayuda a realizar filtros directos mostrando relaciones entre modelos
    client = serializers.PrimaryKeyRelatedField(queryset=User.objects.filter(role='Client'))
    client_data = UserSerializer(source='client', read_only=True) 
    professional = serializers.PrimaryKeyRelatedField(queryset=User.objects.filter(role='Professional'))
    service = serializers.PrimaryKeyRelatedField(queryset=Service.objects.all(), write_only=True)
    service_data = serviceSerializer(read_only=True, source='service')
    location = serializers.PrimaryKeyRelatedField(queryset=Location.objects.all())

    class Meta:
        model = Appointment
        fields = '__all__'
        read_only_fields = ('created_at', 'status')