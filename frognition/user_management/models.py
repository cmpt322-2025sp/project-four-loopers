from django.db import models
from django.contrib.auth.models import AbstractUser
from django.utils.translation import gettext_lazy as _

# Create your models here.
class User(AbstractUser):

    # Add any additional fields or methods you need for your user model here.
    first_name = models.CharField(_('First name of user'), max_length=30, blank=True)
    last_name = models.CharField(_('Last name of user'), max_length=30, blank=True)

    class Meta:
        permissions = (
            ('student', _('Student')),
            ('teacher', _('Teacher')),
        )