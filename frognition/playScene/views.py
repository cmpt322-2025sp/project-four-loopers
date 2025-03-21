from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.response import Response
from .models import *
from .serializers import *
import random
from django.http import JsonResponse
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth.models import User
from rest_framework import status

# Create your views here
class ProblemViewSet(viewsets.ModelViewSet):
    queryset = Problem.objects.all()
    serializer_class = ProblemSerializer

class FlyViewSet(viewsets.ModelViewSet):
    queryset = Fly.objects.all()
    serializer_class = FlySerializer

@api_view(['GET'])
@permission_classes([IsAuthenticated])
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

@api_view(['POST'])
def register_user(request):
    username = request.data.get('username')
    password = request.data.get('password')

    if User.objects.filter(username=username).exists():
        return Response({'error': 'Username already exists'}, status=status.HTTP_400_BAD_REQUEST)

    user = User.objects.create_user(username=username, password=password)
    return Response({'message': 'User created successfully'}, status=status.HTTP_201_CREATED)



