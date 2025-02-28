from rest_framework import serializers
from .models import Problem, Fly


class FlySerializer(serializers.ModelSerializer):
    class Meta:
        model = Fly
        fields = ['id','number']

class ProblemSerializer(serializers.ModelSerializer):
    flies = serializers.PrimaryKeyRelatedField(queryset=Fly.objects.all(), many=True)
    
    class Meta:
        model = Problem
        fields = '__all__'
    
    # def create(self, validated_data):
    #     flies_data = validated_data.pop('flies')  
    #     problem = Problem.objects.create(**validated_data)  
    #     problem.flies.set(flies_data) 
    #     return problem

# class PlayerSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Player
#         fields = '__all__'
#
# class AttemptSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Attempt
#         fields = '__all__'
#