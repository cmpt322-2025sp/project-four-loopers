from django.shortcuts import render
from django.contrib.auth.decorators import *
from rest_framework.decorators import *
from rest_framework.permissions import IsAuthenticated
from django.http import JsonResponse
from .models import *
from user_management.models import User

# Create your views here.

@login_required
@permission_required('user_management.student', raise_exception=True)
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
    
@login_required
@permission_required('user_management.teacher', raise_exception=True)
@api_view(['GET'])
def get_user_stats(request, user_id):
    permission_classes = [IsAuthenticated]
    # Check for teacher being in correct group should happen here (TODO for iteration 3)
    user = User.objects.get(id=user_id)
    attempts = Attempt.objects.filter(user=user)

    if not attempts:
        return JsonResponse({'error': 'No attempts found for this user'}, status=404)

    stats = {
        'first_name': user.first_name,
        'last_name': user.last_name,
        'attempts': [],
    }

    for attempt in attempts:
        stats['attempts'].append({
            'correct': attempt.correct,
            'total': attempt.total,
            'problem_type': attempt.problem_type,
            'timestamp': attempt.timestamp,
        })

    return JsonResponse(stats, status=200)

# Function to get all students' stats for teacher
@login_required
@permission_required('user_management.teacher', raise_exception=True)
@api_view(['GET'])
def get_all_students_stats(request):
    permission_classes = [IsAuthenticated]
    students = User.objects.filter(is_student=True) # Filter correct group should happen in here (TODO for iteration 3)
    all_students_stats = []

    for student in students:
        attempts = Attempt.objects.filter(user=student)
        student_stats = {
            'first_name': student.first_name,
            'last_name': student.last_name,
            'attempts': [],
        }

        for attempt in attempts:
            student_stats['attempts'].append({
                'correct': attempt.correct,
                'total': attempt.total,
                'problem_type': attempt.problem_type,
                'timestamp': attempt.timestamp,
            })

        all_students_stats.append(student_stats)

    return JsonResponse(all_students_stats, safe=False, status=200)