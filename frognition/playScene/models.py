from django.db import models

# Create your models here.
class AdditionProblem(models.Model):
    question = models.CharField(max_length=15)
    answer = models.IntegerField()
    wrongs = models.TextField()

class SubtractionProblem(models.Model):
    question = models.CharField(max_length=15)
    answer = models.IntegerField()
    wrongs = models.TextField()

class DigitProblem(models.Model):
    question = models.CharField(max_length=30)
    answer = models.IntegerField()
    wrongs = models.TextField()