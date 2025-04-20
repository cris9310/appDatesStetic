
from django.db import models
from apps.users.models import User
from apps.users.validators import *


class City(models.Model):
    name = models.CharField(max_length=100)
    department = models.CharField(max_length=100)

    def __str__(self):
        return f"{self.name} ({self.department})"
    
    
class Location(models.Model):
    name = models.CharField(max_length=100)
    address = models.TextField()
    city =  models.ForeignKey(City, on_delete=models.CASCADE)
    phone = models.CharField(max_length=10, blank=False, validators=[validate_10_digits], help_text="Número de 10 dígitos sin prefijo (ej: 3001234567).")
    owner = models.ForeignKey(User, on_delete=models.CASCADE, limit_choices_to={'role': 'professional'})
    opening_time = models.TimeField(default='08:00:00', verbose_name="Hora de apertura")
    closing_time = models.TimeField(default='18:00:00', verbose_name="Hora de cierre")
    available_days = models.CharField(
        max_length=13,
        default='0,1,2,3,4,5', 
        help_text="Días laborales separados por comas (0=Lunes, 6=Domingo)."
    )
    
    def __str__(self):
        return f"{self.name} - {self.city}"