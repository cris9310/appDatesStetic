from rest_framework import serializers

from .models import *


class CitySerializer(serializers.ModelSerializer):
    class Meta:
        model=City
        fields = '__all__'

class LocationSerializers(serializers.ModelSerializer):
    class Meta:
        model=Location
        fields = '__all__'