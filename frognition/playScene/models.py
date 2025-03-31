from django.db import models

# Create your models here.

class Fly(models.Model):
    number = models.IntegerField()

    def __str__(self):
        return f"Fly with number {self.number}"

class Problem(models.Model):
    pass

class AdditionProblem(Problem):
    num1 = models.IntegerField()
    num2 = models.IntegerField()
    correct_answer = models.ForeignKey(
        Fly, on_delete=models.CASCADE, related_name='correct_answer_for_addition_problem')
    flies = models.ManyToManyField(
        Fly, related_name='flies_for_addition_problem')

    def __str__(self):
        return f"{self.num1} + {self.num2} = ?"

class SubtractionProblem(Problem):
    num1 = models.IntegerField()
    num2 = models.IntegerField()
    correct_answer = models.ForeignKey(
        Fly, on_delete=models.CASCADE, related_name='correct_answer_for_subtraction_problem')
    flies = models.ManyToManyField(
        Fly, related_name='flies_for_subtraction_problem')

    def __str__(self):
        return f"{self.num1} - {self.num2} = ?"

# class Player(models.Model):
#     name = models.CharField(max_length=100)
#     score = models.IntegerField()

# class Attempt(models.Model):
#     player = models.ForeignKey(Player, on_delete=models.CASCADE)
#     problem = models.ForeignKey(Problem, on_delete=models.CASCADE)
#     is_correct = models.BooleanField()
#     timestamp = models.DateTimeField(auto_now_add=True)
