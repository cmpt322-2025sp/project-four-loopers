from django.shortcuts import render
from rest_framework import viewsets
from .models import *
from .serializers import *
import random
from django.http import JsonResponse
from rest_framework.decorators import api_view
from rest_framework.permissions import IsAuthenticated, AllowAny
from django.contrib.auth.decorators import login_required
from django.utils.decorators import method_decorator


# Create your views here
class AddProblemViewSet(viewsets.ModelViewSet):
    queryset = AdditionProblem.objects.all()
    serializer_class = ProblemSerializer
    permission_classes = [IsAuthenticated]

class SubProblemViewSet(viewsets.ModelViewSet):
    queryset = SubtractionProblem.objects.all()
    serializer_class = ProblemSerializer
    permission_classes = [IsAuthenticated]

class PlaceValueProblemViewSet(viewsets.ModelViewSet):
    queryset = PlaceValueProblem.objects.all()
    serializer_class = ProblemSerializer
    permission_classes = [IsAuthenticated]

class FlyViewSet(viewsets.ModelViewSet):
    queryset = Fly.objects.all()
    serializer_class = FlySerializer

# @login_required
def get_random_addition_problem(request):
    problem = AdditionProblem.objects.order_by('?').first()  # Get a random problem

    if not problem:
        return JsonResponse({'error': 'No problems available'}, status=404)

    data = {
        'num1': problem.num1,
        'num2': problem.num2,
        'correct_answer': problem.correct_answer.number,  # Ensure correct_answer is a number
        'flies': list(problem.flies.values_list('number', flat=True))  # Convert queryset to list
    }
    
    return JsonResponse(data)

# @login_required
def get_random_subtraction_problem(request):
    problem = SubtractionProblem.objects.order_by('?').first()  # Get a random problem

    if not problem:
        return JsonResponse({'error': 'No problems available'}, status=404)

    data = {
        'num1': problem.num1,
        'num2': problem.num2,
        'correct_answer': problem.correct_answer.number,  # Ensure correct_answer is a number
        'flies': list(problem.flies.values_list('number', flat=True))  # Convert queryset to list
    }
    
    return JsonResponse(data)

# @login_required
def get_random_place_value_problem(request):
    problem = PlaceValueProblem.objects.order_by('?').first()  # Get a random problem

    if not problem:
        return JsonResponse({'error': 'No problems available'}, status=404)

    data = {
        'num': problem.num,
        'place_to_check': problem.place_to_check,
        'correct_answer': problem.correct_answer.number,  # Ensure correct_answer is a number
        'flies': list(problem.flies.values_list('number', flat=True))  # Convert queryset to list
    }
    
    return JsonResponse(data)



