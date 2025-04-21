from rest_framework.routers import SimpleRouter
from user_management.viewsets import UserViewSet, LoginViewSet, RegisterViewSet, RefreshViewSet

routes = SimpleRouter()

routes.register(r'users', UserViewSet, basename='user')
routes.register(r'login', LoginViewSet, basename='login')
routes.register(r'register', RegisterViewSet, basename='register')
routes.register(r'refresh', RefreshViewSet, basename='refresh')

urlpatterns = [
    *routes.urls,
]