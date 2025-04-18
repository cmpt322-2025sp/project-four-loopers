from django.shortcuts import render
from .models import User
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import AllowAny
from django.contrib.auth.views import LoginView, LogoutView
from django.http import JsonResponse as JsonResponse
from django.http import HttpResponse
from django.middleware.csrf import get_token
from django.http import JsonResponse
from django.views.decorators.csrf import ensure_csrf_cookie
from django.contrib.auth import login 

# Create your views here.

class FrognitionLoginView(LoginView):
    permission_classes = [AllowAny]
    def loginview(request):
        if request.method == 'POST':
            username = request.POST.get('username')
            password = request.POST.get('password')
            user = authenticate(request, username=username, password=password)
            if user is not None:
                login(request, user)
                return JsonResponse({'message': 'Login successful'}, status=200)
            else:
                return JsonResponse({'error': 'Invalid credentials'}, status=400)
        return JsonResponse({'error': 'Invalid request method'}, status=405)
    def form_valid(self, form):
        self.request.session.set_expiry(0)  # Set session to expire when the user closes the browser
        return JsonResponse({'message': 'Login successful'}, status=200)
    
    def form_invalid(self, form):
        return JsonResponse({'error': 'Invalid credentials'}, status=400)
    


class FrognitionLogoutView(LogoutView):
    def dispatch(self, request, *args, **kwargs):
        response = super().dispatch(request, *args, **kwargs)
        return JsonResponse({'message': 'Logout successful'}, status=200)
    

@api_view(['POST'])
def register_user(request):
    permission_classes = [AllowAny]  # Allow unauthenticated access
    username = request.data.get('username')
    password = request.data.get('password')
    email = request.data.get('email')
    first_name = request.data.get('first_name')
    last_name = request.data.get('last_name')
    is_teacher = request.data.get('is_teacher', False)

    if not username or not password:
        return Response({'error': 'Username and password are required'}, status=status.HTTP_400_BAD_REQUEST)

    if User.objects.filter(username=username).exists():
        return Response({'error': 'Username already exists'}, status=status.HTTP_400_BAD_REQUEST)

    user = User.objects.create_user(username=username, password=password, email=email, first_name=first_name, last_name=last_name)
    if is_teacher:
        user.is_teacher = True
    else:
        user.is_student = True
    
    # Group assignment happens here (TODO for iteration 3)
    user.save()
    return Response({'message': 'User registered successfully'}, status=status.HTTP_201_CREATED)

@ensure_csrf_cookie
def get_csrf(request):
    return JsonResponse({'detail': 'CSRF cookie set'})