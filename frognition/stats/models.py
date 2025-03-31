from django.db import models

# Create your models here.
class Attempt(models.Model):
    user = models.ForeignKey('auth.User', on_delete=models.CASCADE)
    problem_type = models.CharField(max_length=50)  # 'addition', 'subtraction', 'place_value', or 'random'
    correct = models.IntegerField()
    total = models.IntegerField()
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user.username} - {self.problem_type} - {self.correct}/{self.total} - {self.timestamp}"