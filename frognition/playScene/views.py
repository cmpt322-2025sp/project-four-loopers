from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.response import Response
from .models import *
from .serializers import *
import random
from django.http import JsonResponse
from rest_framework.decorators import api_view
from rest_framework.permissions import IsAuthenticated

# Create your views here
class ProblemViewSet(viewsets.ModelViewSet):
    queryset = Problem.objects.all()
    serializer_class = ProblemSerializer
    permission_classes = [IsAuthenticated]

class FlyViewSet(viewsets.ModelViewSet):
    queryset = Fly.objects.all()
    serializer_class = FlySerializer

@login_required
@api_view(['GET'])
def get_random_problem(request):
    problem = Problem.objects.order_by('?').first()  # Get a random problem

    if not problem:
        return JsonResponse({'error': 'No problems available'}, status=404)

    data = {
        'num1': problem.num1,
        'num2': problem.num2,
        'correct_answer': problem.correct_answer.number,  # Ensure correct_answer is a number
        'flies': list(problem.flies.values_list('number', flat=True))  # Convert queryset to list
    }
    
    return JsonResponse(data)



