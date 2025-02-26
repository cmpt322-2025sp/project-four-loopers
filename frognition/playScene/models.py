from django.db import models

# Create your models here.
class Problem(models.Model):
    num1 = models.IntegerField()
    num2 = models.IntegerField()
    correct_answer = models.ForeignKey('Fly', on_delete=models.CASCADE)

    def __str__(self):
        return f"{self.num1} + {self.num2} = ?"

class Fly(models.Model):
    flyForProblem = models.ManyToManyField(Problem) # This is a many-to-many relationship with problem and fly
    number = models.IntegerField()

# class Player(models.Model):
#     name = models.CharField(max_length=100)
#     score = models.IntegerField()

# class Attempt(models.Model):
#     player = models.ForeignKey(Player, on_delete=models.CASCADE)
#     problem = models.ForeignKey(Problem, on_delete=models.CASCADE)
#     is_correct = models.BooleanField()
#     timestamp = models.DateTimeField(auto_now_add=True)
