from rest_framework import serializers
from .models import Problem, Fly, PlaceValueProblem


class FlySerializer(serializers.ModelSerializer):
    class Meta:
        model = Fly
        fields = ['id', 'number']  # Include id and number

class ProblemSerializer(serializers.ModelSerializer):
    correct_answer = FlySerializer()  # Serialize the correct answer
    flies = FlySerializer(many=True)  # Serialize all flies

    class Meta:
        model = Problem
        fields = ['id', 'num1', 'num2', 'correct_answer', 'flies']
    def create(self, validated_data):
        flies_data = validated_data.pop('flies')
        problem = Problem.objects.create(**validated_data)
        problem.flies.set(flies_data)
        return problem

class PlaceValueSerializer(serializers.ModelSerializer):
    correct_answer = FlySerializer()
    flies = FlySerializer(many=True)

    class Meta:
        model = PlaceValueProblem
        fields = ['id', 'num', 'place_to_check', 'correct_answer', 'flies']
    def create(self, validated_data):
        flies_data = validated_data.pop('flies')
        problem = PlaceValueProblem.objects.create(**validated_data)
        problem.flies.set(flies_data)
        return problem

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