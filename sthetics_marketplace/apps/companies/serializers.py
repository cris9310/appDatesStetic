from rest_framework import serializers
from django.db.models import Avg
from drf_spectacular.utils import extend_schema_field

from apps.services.serializers import serviceSerializer
from apps.services.models import Service
from apps.users.serializers import ProfessionalRegisterSerializer
from .models import *


class CitySerializer(serializers.ModelSerializer):
    class Meta:
        model=City
        fields = '__all__'

class LocationSerializers(serializers.ModelSerializer):
    owner = ProfessionalRegisterSerializer()
    average_score = serializers.SerializerMethodField()
    total_reviews = serializers.SerializerMethodField()
    services = serializers.SerializerMethodField()
    image = serializers.ImageField()
    city = serializers.StringRelatedField()
    rut_document = serializers.ImageField()
    category = serializers.StringRelatedField()

    class Meta:
        model=Location
        fields = '__all__'
    
    def create(self, validated_data):
        owner_data = {
        'name': validated_data.pop('name'),
        'email': validated_data.pop('email'),
        'phone':validated_data.pop('phone'),
        'password':validated_data.pop('password'),
        'profile_image': validated_data.pop('profile_image'),
        }
        user = User.objects.create_user(**owner_data)
        business = Location.objects.create(owner=user, **validated_data)
        return business

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

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model=Category
        fields = '__all__'