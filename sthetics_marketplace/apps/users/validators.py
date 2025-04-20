from django.core.exceptions import ValidationError
from django.utils.translation import gettext_lazy as _

def validate_10_digits(value):
    if not value.isdigit():
        raise ValidationError(_("El campo solo puede contener números."))
    if len(value) != 10:
        raise ValidationError(_("El campo debe tener exactamente 10 dígitos."))