from rest_framework import serializers

from .models import *

from django.contrib.auth import get_user_model


User = get_user_model()
class AppointmentSerializer(serializers.ModelSerializer):

    #Esta parte nos ayuda a realizar filtros directos mostrando relaciones entre modelos
    client = serializers.PrimaryKeyRelatedField(queryset=User.objects.filter(role='client'))
    professional = serializers.PrimaryKeyRelatedField(queryset=User.objects.filter(role='professional'))
    service = serializers.PrimaryKeyRelatedField(queryset=Service.objects.all())
    location = serializers.PrimaryKeyRelatedField(queryset=Location.objects.all())

    class Meta:
        model = Appointment
        fields = '__all__'
        read_only_fields = ('created_at', 'status')