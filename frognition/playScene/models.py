from django.db import models

# Create your models here.
class React(models.Model):
    question = models.CharField(max_length=200)
    answer = models.CharField(max_length=100)
