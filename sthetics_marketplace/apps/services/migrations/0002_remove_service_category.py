# Generated by Django 5.2.1 on 2025-06-02 11:04

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('services', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='service',
            name='category',
        ),
    ]
