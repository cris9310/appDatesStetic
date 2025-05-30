from django.db import models
from apps.users.models import User
from apps.services.models import Service
from apps.companies.models import Location

class Appointment(models.Model):
    client = models.ForeignKey(User, related_name='appointments', on_delete=models.CASCADE, limit_choices_to={'roles': 'Client'})
    professional = models.ForeignKey(User, related_name='services_given', on_delete=models.CASCADE, limit_choices_to={'roles': 'Professional'})
    service = models.ForeignKey(Service, on_delete=models.CASCADE)
    location = models.ForeignKey(Location, on_delete=models.CASCADE)
    datetime = models.DateTimeField(verbose_name="Fecha y hora de la cita")
    created_at = models.DateTimeField(auto_now_add=True)
    status = models.CharField(max_length=20, choices=[
        ('Pendiente', 'Pendiente'),
        ('Completado', 'Completado'),
        ('Cancelado', 'Cancelado'),
    ], default='Pendiente')

    class Meta:
        ordering = ['-datetime']
        
    def __str__(self):
        return f"{self.client.name} - {self.service.name} ({self.datetime})"