from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
from django.utils import timezone


from .validators import *

class CustomUserManager(BaseUserManager):
    def create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError("Email is required")
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user
    
    def create_superuser(self, email, password=None, **extra_fields):
        extra_fields.setdefault("is_staff", True)
        extra_fields.setdefault("is_superuser", True)
        return self.create_user(email, password, **extra_fields)

class User(AbstractBaseUser, PermissionsMixin):
    ROLE_CHOICES = (
        ('Client', 'Client'),
        ('Professional', 'Professional'),
    )
    email = models.EmailField(unique=True)
    name = models.CharField(max_length=255, blank=False)
    role = models.CharField(max_length=20, choices=ROLE_CHOICES)
    phone = models.CharField(max_length=10, blank=False, validators=[validate_10_digits],unique=True)
    profile_image = models.ImageField(upload_to='users/', null=True, blank=True)
    trial_start_date = models.DateField(null=True)
    trial_end_date = models.DateField(null=True)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)

    objects = CustomUserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['name', 'phone', 'role']

    def is_trial_active(self):
        # Valida periodo de prueba solo para profesionales
        if self.role.filter(name='Professional').exists():
            return self.trial_end_date and self.trial_end_date >= timezone.now().date()
        return False

    def __str__(self):
        return f"{self.name} ({self.role})"
