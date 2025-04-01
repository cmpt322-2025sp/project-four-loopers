from django.db import models
from django.utils.translation import gettext_lazy as _

# Create your models here.
class Attempt(models.Model):
    class ProblemTypes(models.TextChoices):
        ADDITION = 'AD', _('Addition')
        SUBTRACTION = 'SU', _('Subtraction')
        PLACE_VALUE = 'PV', _('Place Value')
        RANDOM = 'RA', _('Random')

    user = models.ForeignKey('auth.User', on_delete=models.CASCADE)
    problem_type = models.CharField(max_length=2, choices=ProblemTypes.choices, default=ProblemTypes.ADDITION)
    correct = models.IntegerField()
    total = models.IntegerField()
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user.username} - {self.problem_type} - {self.correct}/{self.total} - {self.timestamp}"