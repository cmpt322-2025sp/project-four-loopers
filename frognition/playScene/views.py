from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.response import Response
from .models import *
from .serializers import *
import random
from django.http import JsonResponse

# Create your views here
class ProblemViewSet(viewsets.ModelViewSet):
    queryset = Problem.objects.all()
    serializer_class = ProblemSerializer

class FlyViewSet(viewsets.ModelViewSet):
    queryset = Fly.objects.all()
    serializer_class = FlySerializer

def get_problem(request):
    # Generate a random problem (e.g., addition)
    num1 = random.randint(1, 10)
    num2 = random.randint(1, 10)

    # Fetch flies from the database
    flies = list(Fly.objects.values_list('number', flat=True))

    # Pick a random set of flies (for simplicity, we'll just take the first 2 flies for now)
    selected_flies = random.sample(flies, 2) if len(flies) >= 2 else flies

    # Select a random correct answer from the flies
    correct_answer = random.choice(selected_flies)

    # Prepare the problem data
    problem_data = {
        "id": random.randint(1, 1000),
        "flies": selected_flies,
        "num1": num1,
        "num2": num2,
        "correct_answer": correct_answer
    }

    return JsonResponse(problem_data)


