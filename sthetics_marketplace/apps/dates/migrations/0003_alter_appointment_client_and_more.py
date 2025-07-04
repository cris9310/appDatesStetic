# Generated by Django 5.2.1 on 2025-06-02 09:51

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('dates', '0002_initial'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.AlterField(
            model_name='appointment',
            name='client',
            field=models.ForeignKey(limit_choices_to={'role': 'Client'}, on_delete=django.db.models.deletion.CASCADE, related_name='appointments', to=settings.AUTH_USER_MODEL),
        ),
        migrations.AlterField(
            model_name='appointment',
            name='professional',
            field=models.ForeignKey(limit_choices_to={'role': 'Professional'}, on_delete=django.db.models.deletion.CASCADE, related_name='services_given', to=settings.AUTH_USER_MODEL),
        ),
    ]
