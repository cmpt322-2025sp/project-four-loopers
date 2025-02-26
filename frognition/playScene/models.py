from django.db import models

# Create your models here.
class Problem(models.Model):
    opperand1 = models.IntegerField()
    opperand2 = models.IntegerField()
    correct_answer = models.IntegerField()

    def __str__(self):
        return f"{self.opperand1} + {self.opperand2} = ?"

class Fly(models.Model):
    problem = models.ForeignKey(Problem, on_delete=models.CASCADE,realeted_name='flies')
    number_on_wings = models.IntegerField()
    is_correct = models.BooleanField()

class Player(models.Model):
    name = models.CharField(max_length=100)
    score = models.IntegerField()

class Attempt(models.Model):
    player = models.ForeignKey(Player, on_delete=models.CASCADE)
    problem = models.ForeignKey(Problem, on_delete=models.CASCADE)
    selected_fly = models.ForeignKey(Fly, on_delete=models.CASCADE)
    is_correct = models.BooleanField()
    timestamp = models.DateTimeField(auto_now_add=True)