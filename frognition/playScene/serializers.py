from rest_framework import serializers
from .models import Problem, Fly, Player, Attempt

class ProblemSerializer(serializers.ModelSerializer):
    class Meta:
        model = Problem
        fields = '__all__'

class FlySerializer(serializers.ModelSerializer):
    class Meta:
        model = Fly
        fields = '__all__'

class PlayerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Player
        fields = '__all__'

class AttemptSerializer(serializers.ModelSerializer): 
    class Meta:
        model = Attempt
        fields = '__all__'
        