from django.shortcuts import render
from django.contrib.auth.models import User
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import AllowAny
from django.contrib.auth.views import LoginView, LogoutView
from django.http import JsonResponse as JsonResponse

# Create your views here.

class FrognitionLoginView(LoginView):
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

    if not username or not password:
        return Response({'error': 'Username and password are required'}, status=status.HTTP_400_BAD_REQUEST)

    if User.objects.filter(username=username).exists():
        return Response({'error': 'Username already exists'}, status=status.HTTP_400_BAD_REQUEST)

    user = User.objects.create_user(username=username, password=password, email=email)
    return Response({'message': 'User registered successfully'}, status=status.HTTP_201_CREATED)

