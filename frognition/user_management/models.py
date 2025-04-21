from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
from django.utils.translation import gettext_lazy as _


class UserManager(BaseUserManager):
    def create_user(self,username, email, password=None,**kwargs):
        if username is None:
            raise TypeError('Users must have a username')
        if email is None:
            raise TypeError('Users must have an email address')
        
        user = self.model(username=username, email=self.normalize_email(email))
        user.set_password(password)
        user.save(using=self._db)
        return user
    
    def create_superuser(self, username, email, password):
        if password is None:
            raise TypeError('Superusers must have a password')
        if email is None:
            raise TypeError('Superusers must have an email')
        if username is None:
            raise TypeError('Superusers must have a username')
        
        user = self.create_user(username, email, password)
        user.is_superuser = True
        user.is_staff = True
        user.save(using=self._db)
        return user
    
class User(AbstractBaseUser, PermissionsMixin):
    # Add any additional fields or methods you need for your user model here.
    first_name = models.CharField(_('First name of user'), max_length=30, blank=True)
    last_name = models.CharField(_('Last name of user'), max_length=30, blank=True)
    username = models.CharField(db_index=True,max_length=255, unique=True)
    email = models.EmailField(db_index=True, unique=True, null=True,blank=True)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)

    REQUIRED_FIELDS = ['username']
    
    objects = UserManager()

    def __str__(self):
        return f"{self.username}"
