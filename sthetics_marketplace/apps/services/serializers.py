from rest_framework import serializers

from .models import *


class serviceSerializer(serializers.ModelSerializer):
    
    class Meta:
        model=Service
        fields = ['id', 'name', 'description', 'price', 'duration_minutes', 'location']