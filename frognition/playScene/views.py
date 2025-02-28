from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.response import Response
from .models import *
from .serializers import *

# Create your views here
class ProblemViewSet(viewsets.ModelViewSet):
    queryset = Problem.objects.all()
    serializer_class = ProblemSerializer

class FlyViewSet(viewsets.ModelViewSet):
    queryset = Fly.objects.all()
    serializer_class = FlySerializer




