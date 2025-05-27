from django.db import models

from apps.companies.models import *

class Category(models.Model):
    name = models.CharField(max_length=100)

    def __str__(self):
        return f"{self.name}"

class Service(models.Model):
    category =  models.ForeignKey(Category, on_delete=models.CASCADE, null=True)
    name = models.CharField(max_length=100,blank=False)
    description = models.TextField(blank=False)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    duration_minutes = models.PositiveIntegerField(help_text="Duración en minutos (ej: 30).")
    location = models.ForeignKey(Location, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
