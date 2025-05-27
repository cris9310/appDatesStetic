from rest_framework import serializers
from django.db.models import Avg
from drf_spectacular.utils import extend_schema_field

from apps.services.serializers import serviceSerializer
from apps.services.models import Service
from .models import *


class CitySerializer(serializers.ModelSerializer):
    class Meta:
        model=City
        fields = '__all__'

class LocationSerializers(serializers.ModelSerializer):
    average_score = serializers.SerializerMethodField()
    total_reviews = serializers.SerializerMethodField()
    services = serializers.SerializerMethodField()
    image = serializers.ImageField()
    city = serializers.StringRelatedField()

    class Meta:
        model=Location
        fields = '__all__'

    @extend_schema_field(serializers.FloatField())
    def get_average_score(self, obj):
        return Reviews.objects.filter(location=obj).aggregate(avg=Avg('score'))['avg'] or 0.0

    @extend_schema_field(serializers.IntegerField())
    def get_total_reviews(self, obj):
        return Reviews.objects.filter(location=obj).count()

    @extend_schema_field(serviceSerializer(many=True))
    def get_services(self, obj):
        services = Service.objects.filter(location=obj)
        return serviceSerializer(services, many=True).data

