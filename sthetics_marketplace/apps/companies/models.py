
from django.db import models
from apps.users.models import User
from apps.users.validators import *


class City(models.Model):
    nameCity = models.CharField(max_length=100)
    department = models.CharField(max_length=100)

    def __str__(self):
        return f"{self.nameCity} ({self.department})"
    
class Location(models.Model):
    name = models.CharField(max_length=100)
    address = models.TextField()
    city =  models.ForeignKey(City, on_delete=models.CASCADE)
    phone = models.CharField(max_length=10, blank=False, validators=[validate_10_digits])
    owner = models.ForeignKey(User, on_delete=models.CASCADE, limit_choices_to={'role': 'professional'})

    def __str__(self):
        return f"{self.name} - {self.city}"