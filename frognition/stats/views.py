from django.shortcuts import render
from django.contrib.auth.decorators import *
from rest_framework.decorators import *
from rest_framework.permissions import IsAuthenticated
from django.http import JsonResponse
from .models import *
from user_management.models import User
from django.contrib.auth.models import Group, Permission

# Create your views here.

# @login_required
# @permission_required('student', raise_exception=True)
@api_view(['POST'])
def record_results(request):
    permission_classes = [IsAuthenticated]
    # Check if the user is a student
    if not request.user.groups.filter(name='student').exists():
        return JsonResponse({'error': 'Permission denied'}, status=403)

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
    
# @login_required
# @permission_required('user_management.teacher', raise_exception=True)
@api_view(['GET'])
def get_user_stats(request, user_id):
    permission_classes = [IsAuthenticated]
    # Check if the user is a teacher and belongs to the same class as the student
    if not request.user.groups.filter(name='teacher').exists():
        return JsonResponse({'error': 'Permission denied'}, status=403)
    classGroup = Group.objects.get(name=request.user.groups.filter(name__startswith='class_').first())
    if not classGroup.user_set.filter(id=user_id).exists():
        return JsonResponse({'error': 'User not in your class'}, status=403)
    
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
# @login_required
# @permission_required('user_management.teacher', raise_exception=True)
@api_view(['GET'])
def get_all_students_stats(request):
    permission_classes = [IsAuthenticated]
    # Check if the user is a teacher
    if not request.user.groups.filter(name='teacher').exists():
        return JsonResponse({'error': 'Permission denied'}, status=403)
    classGroup = Group.objects.get(name=request.user.groups.filter(name__startswith='class_').first())
    students = User.objects.filter(groups__in=classGroup, groups__name__in=['student'])
    all_students_stats = []

    for student in students:
        addition_attempts = Attempt.objects.filter(user=student, problem_type=Attempt.ProblemTypes.ADDITION)
        subtraction_attempts = Attempt.objects.filter(user=student, problem_type=Attempt.ProblemTypes.SUBTRACTION)
        place_value_attempts = Attempt.objects.filter(user=student, problem_type=Attempt.ProblemTypes.PLACE_VALUE)
        random_attempts = Attempt.objects.filter(user=student, problem_type=Attempt.ProblemTypes.RANDOM)
        # Calculate averages for each problem type
        if addition_attempts.exists():
            addition_average = float('%.2f' % float(sum(attempt.correct for attempt in addition_attempts) / sum(attempt.total for attempt in addition_attempts)))
            addition_avg_correct = float('%.2f' % float(sum(attempt.correct for attempt in addition_attempts) / len(addition_attempts)))
        else:
            addition_average = 0
            addition_avg_correct = 0
        
        if subtraction_attempts.exists():
            subtraction_average = float('%.2f' % float(sum(attempt.correct for attempt in subtraction_attempts) / sum(attempt.total for attempt in subtraction_attempts)))
            subtraction_avg_correct = float('%.2f' % float(sum(attempt.correct for attempt in subtraction_attempts) / len(subtraction_attempts)))
        else:
            subtraction_average = 0
            subtraction_avg_correct = 0

        if place_value_attempts.exists():
            place_value_average = float('%.2f' % float(sum(attempt.correct for attempt in place_value_attempts) / sum(attempt.total for attempt in place_value_attempts)))
            place_value_avg_correct = float('%.2f' % float(sum(attempt.correct for attempt in place_value_attempts) / len(place_value_attempts)))
        else:
            place_value_average = 0
            place_value_avg_correct = 0

        if random_attempts.exists():
            random_average = float('%.2f' % float(sum(attempt.correct for attempt in random_attempts) / sum(attempt.total for attempt in random_attempts)))
            random_avg_correct = float('%.2f' % float(sum(attempt.correct for attempt in random_attempts) / len(random_attempts)))
        else:
            random_average = 0
            random_avg_correct = 0

        student_stats = {
            'first_name': student.first_name,
            'last_name': student.last_name,
            'addition_avg_accuracy': addition_average,
            'addition_avg_correct': addition_avg_correct,
            'subtraction_avg_accuracy': subtraction_average,
            'subtraction_avg_correct': subtraction_avg_correct,
            'place_value_avg_accuracy': place_value_average,
            'place_value_avg_correct': place_value_avg_correct,
            'random_avg_accuracy': random_average,
            'random_avg_correct': random_avg_correct,
            'level_progress': student.latest_unlocked_level,
        }


        all_students_stats.append(student_stats)

    return JsonResponse(all_students_stats, safe=False, status=200)

# Function to reset a student's stats
# @login_required
# @permission_required('user_management.teacher', raise_exception=True)
@api_view(['POST'])
def reset_student_stats(request, user_id):
    permission_classes = [IsAuthenticated]
    # Check if the user is a teacher and belongs to the same class as the student
    if not request.user.groups.filter(name='teacher').exists():
        return JsonResponse({'error': 'Permission denied'}, status=403)
    classGroup = Group.objects.get(name=request.user.groups.filter(name__startswith='class_').first())
    if not classGroup.user_set.filter(id=user_id).exists():
        return JsonResponse({'error': 'User not in your class'}, status=403)
    
    user = User.objects.get(id=user_id)
    attempts = Attempt.objects.filter(user=user)

    if not attempts:
        return JsonResponse({'error': 'No attempts found for this user'}, status=404)

    attempts.delete()
    user.latest_unlocked_level = 0
    user.save()

    return JsonResponse({'message': 'Student stats reset successfully'}, status=200)