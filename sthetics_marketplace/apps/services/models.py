from django.db import models

from apps.companies.models import *

class Service(models.Model):
    name = models.CharField(max_length=100,blank=False)
    description = models.TextField(blank=False)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    duration_minutes = models.PositiveIntegerField(help_text="Duración en minutos (ej: 30).")
    location = models.ForeignKey(Location, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
