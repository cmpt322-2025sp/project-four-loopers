from django.db import models
from django.utils.translation import gettext_lazy as _

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

class PlaceValueProblem(Problem):
    class PlaceValueChoices(models.TextChoices):
        ONES = 'O', _('Ones')
        TENS = 'T', _('Tens')
        HUNDREDS = 'H', _('Hundreds')
    
    num = models.IntegerField()
    place_to_check = models.CharField(
        max_length=1, choices=PlaceValueChoices.choices, default=PlaceValueChoices.ONES)
    correct_answer = models.ForeignKey(
        Fly, on_delete=models.CASCADE, related_name='correct_answer_for_place_value_problem')
    flies = models.ManyToManyField(
        Fly, related_name='flies_for_place_value_problem')

    def __str__(self):
        return f"What is in the {self.place_to_check} place of {self.num}?"
