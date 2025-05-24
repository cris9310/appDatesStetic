from rest_framework import serializers
from django.db.models import Avg

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

    class Meta:
        model=Location
        fields = '__all__'

    def get_average_score(self, obj):
        return Reviews.objects.filter(location=obj).aggregate(avg=Avg('score'))['avg'] or 0.0

    def get_total_reviews(self, obj):
        return Reviews.objects.filter(location=obj).count()

    def get_services(self, obj):
        services = Service.objects.filter(location=obj)
        return serviceSerializer(services, many=True).data

