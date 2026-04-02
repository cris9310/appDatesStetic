from django.db import models
from apps.users.models import User
from apps.companies.models import Location


class Subscription(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    status = models.CharField(
        max_length=20,
        choices=[
            ('trial', 'Trial'),
            ('active', 'Active'),
            ('past_due', 'Past due'),
            ('suspended', 'Suspended'),
        ],
        default='trial'
    )
    trial_start = models.DateField()
    trial_end = models.DateField()
    current_period_start = models.DateField(null=True, blank=True)
    current_period_end = models.DateField(null=True, blank=True)
    is_active = models.BooleanField(default=True)


class Invoice(models.Model):
    subscription = models.ForeignKey(Subscription, on_delete=models.CASCADE)

    period_start = models.DateField()
    period_end = models.DateField()

    total_amount = models.IntegerField()
    status = models.CharField(
        max_length=20,
        choices=[
            ('pending', 'Pending'),
            ('paid', 'Paid'),
            ('failed', 'Failed'),
        ],
        default='pending'
    )

    created_at = models.DateTimeField(auto_now_add=True)

class InvoiceItem(models.Model):
    invoice = models.ForeignKey(Invoice, on_delete=models.CASCADE)
    location = models.ForeignKey(Location, on_delete=models.CASCADE)
    price = models.IntegerField()