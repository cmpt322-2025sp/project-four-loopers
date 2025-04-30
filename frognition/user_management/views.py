from django.shortcuts import render
from .models import User
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import AllowAny
from django.contrib.auth.views import LoginView, LogoutView
from django.contrib.auth.decorators import login_required, permission_required
from django.http import JsonResponse as JsonResponse
from django.http import HttpResponse
from django.middleware.csrf import get_token
from django.http import JsonResponse
from django.views.decorators.csrf import ensure_csrf_cookie
from django.contrib.auth import login 

# Create your views here.

@api_view(['GET'])
@login_required
def get_level_progress(request):
    user = request.user
    return JsonResponse({'level': user.latest_unlocked_level}, status=200)