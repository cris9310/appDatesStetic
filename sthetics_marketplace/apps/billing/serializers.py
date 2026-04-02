from rest_framework import serializers

from .models import *


class InvoiceSerializer(serializers.ModelSerializer):
    
    class Meta:
        model=Invoice
        fields = ['id', 'subscription', 'period_start', 'period_end', 'total_amount','status','created_at']