from rest_framework import serializers
from datetime import datetime, timedelta
from django.utils import timezone

from .models import *
from apps.services.serializers import serviceSerializer
from apps.users.serializers import UserSerializer
from apps.services.models import Service
from apps.companies.models import Location

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


class AvailabilitySlotSerializer(serializers.Serializer):
    """
    Serializador para mostrar disponibilidades de un local según 
    la duración del servicio y el rango de fechas (hasta 3 meses)
    """
    datetime = serializers.DateTimeField()
    available = serializers.BooleanField()
    duration_minutes = serializers.IntegerField()
    
    
    def to_representation(self, instance):
        
        return {
            'datetime': instance['datetime'],
            'available': instance['available'],
            'duration_minutes': instance['duration_minutes'],
            'formatted_date': instance['datetime'].strftime('%d/%m/%Y'),
            'formatted_time': instance['datetime'].strftime('%H:%M'),
        }
    
    