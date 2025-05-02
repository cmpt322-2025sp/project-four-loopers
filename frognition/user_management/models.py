from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin, Group, Permission
from django.utils.translation import gettext_lazy as _


class UserManager(BaseUserManager):
    def create_user(self,username, email, first_name, last_name, password=None,**kwargs):
        if username is None:
            raise TypeError('Users must have a username')
        if email is None:
            raise TypeError('Users must have an email address')
        
        user = self.model(username=username, email=self.normalize_email(email), first_name=first_name, last_name=last_name)
        user.set_password(password)
        user.save(using=self._db)
        return user
    
    def create_student_user(self, username, email, first_name, last_name, class_name=None, password=None, **kwargs):
        if username is None:
            raise TypeError('Users must have a username')
        if email is None:
            raise TypeError('Users must have an email address')
        
        user = self.create_user(username, email, first_name, last_name, password)
        typeGroup = Group.objects.get_or_create(name='student')
        classGroup = Group.objects.get_or_create(name='class_1')
        typeGroup[0].permissions.add(Permission.objects.get_or_create(codename='student')[0])
        typeGroup[0].user_set.add(user)
        classGroup[0].user_set.add(user)
        user.save(using=self._db)
        typeGroup[0].save(using=self._db)
        classGroup[0].save(using=self._db)
        return user
    
    def create_teacher_user(self, username, email, class_name, password=None, **kwargs):
        if username is None:
            raise TypeError('Users must have a username')
        if email is None:
            raise TypeError('Users must have an email address')
        
        user = self.create_user(username, email, password)
        typeGroup = Group.objects.get_or_create(name='teacher')
        classGroup = Group.objects.get_or_create(name='class_1')
        typeGroup[0].permissions.add(Permission.objects.get_or_create(codename='teacher')[0])
        typeGroup[0].user_set.add(user)
        classGroup[0].user_set.add(user)
        user.save(using=self._db)
        typeGroup[0].save(using=self._db)
        classGroup[0].save(using=self._db)
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
    latest_unlocked_level = models.IntegerField(default=0)

    USERNAME_FIELD = 'username'
    REQUIRED_FIELDS = ['first_name', 'last_name']
    
    objects = UserManager()

    def __str__(self):
        return f"{self.username}"
    
    class Meta:
        permissions = (
            ('student', 'Student'),
            ('teacher', 'Teacher'),
        )

