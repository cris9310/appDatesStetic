from django.db import models
from apps.users.models import User
from apps.services.models import Service
from apps.companies.models import Location

class Appointment(models.Model):
    client = models.ForeignKey(User, related_name='appointments', on_delete=models.CASCADE, limit_choices_to={'role': 'client'})
    professional = models.ForeignKey(User, related_name='services_given', on_delete=models.CASCADE, limit_choices_to={'role': 'professional'})
    service = models.ForeignKey(Service, on_delete=models.CASCADE)
    location = models.ForeignKey(Location, on_delete=models.CASCADE)
    date = models.DateField()
    time = models.TimeField()
    created_at = models.DateTimeField(auto_now_add=True)
    status = models.CharField(max_length=20, choices=[
        ('pendiente', 'Pendiente'),
        ('completado', 'Completado'),
        ('cancelado', 'Cancelado'),
    ], default='Pendiente')

    def __str__(self):
        return f"{self.client.name} - {self.service.name} on {self.date}"