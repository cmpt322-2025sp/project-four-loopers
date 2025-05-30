"""
URL configuration for frognition project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from playScene.views import *
from stats.views import *
from user_management.views import get_level_progress
from rest_framework.routers import DefaultRouter
from django.contrib.auth import views as auth_views

router = DefaultRouter()
router.register(r'addition_problems', AddProblemViewSet)
router.register(r'subtraction_problems', SubProblemViewSet)
router.register(r'place_value_problems', PlaceValueProblemViewSet)
router.register(r'flies', FlyViewSet)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('get_map_progress/', get_level_progress),
    path('get_random_problem/addition/', get_random_addition_problem),
    path('get_random_problem/subtraction/', get_random_subtraction_problem),
    path('get_random_problem/place_value/', get_random_place_value_problem),
    path('submit_results/', record_results),
    path('get_student_stats/', get_all_students_stats),  # For teacher to get all students' stats
    path('get_student_stats/<int:user_id>/', get_user_stats),  # For teacher to get specific student's stats
    path('reset_stats/<int:user_id>/', reset_student_stats), 
    path('api/', include(router.urls)),
    path('auth/', include('user_management.routers')),
]
