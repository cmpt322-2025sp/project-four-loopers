from django.shortcuts import render
from django.contrib.auth.decorators import login_required
from rest_framework.decorators import api_view
from rest_framework.permissions import IsAuthenticated
from django.http import JsonResponse
from .models import *

# Create your views here.

@login_required
@api_view(['POST'])
def record_results(request):
    permission_classes = [IsAuthenticated]
    user = request.user
    correct = request.data.get('correct')
    total = request.data.get('total')
    problem_type = request.data.get('problem_type')

    if not all([correct, total, problem_type]):
        return JsonResponse({'error': 'Missing data'}, status=400)
    
    attempt = Attempt.objects.create(
        user=user,
        correct=correct,
        total=total,
        problem_type=problem_type
    )
    return JsonResponse({'message': 'Results recorded successfully'}, status=201)
    
