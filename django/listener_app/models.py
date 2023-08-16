from django.db import models
from django.contrib.auth.models import AbstractUser

class Listener(AbstractUser):
    email = models.EmailField(verbose_name='email address', max_length=64, unique=True)
    name = models.CharField(max_length=64, null=True)
    USERNAME_FIELD='email'
    REQUIRED_FIELDS=[]