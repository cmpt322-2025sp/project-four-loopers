from user_management.serializers import UserSerializer, LoginSerializer, RegisterSerializer
from user_management.models import User
from rest_framework import viewsets, filters, status
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from rest_framework.viewsets import ModelViewSet
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.exceptions import TokenError, InvalidToken


class UserViewSet(viewsets.ModelViewSet):
   http_method_names = ['get']
   serializer_class = UserSerializer
   permission_classes = [IsAuthenticated]
   filter_backends = [filters.OrderingFilter]
   ordering_fields = ['updated']
   ordering = ['-updated']

   def get_queryset(self):
     if self.request.user.is_superuser:
        return User.objects.all()
     
   def get_object(self):
       lookup_field_value = self.kwargs[self.lookup_field]

       obj = User.objects.get(lookup_field_value)
       self.check_object_permissions(self.request, obj)

       return obj
   
class LoginViewSet(ModelViewSet, TokenObtainPairView):
   serializer_class = LoginSerializer
   permission_classes = (AllowAny,)
   http_method_names = ['post']

   def create(self, request, *args, **kwargs):
      serializer = self.get_serializer(data=request.data)
      try:
         serializer.is_valid(raise_exception=True)
      except TokenError as e:
         raise InvalidToken(e.args[0])
      return Response(serializer.validated_data, status=status.HTTP_200_OK)
   
class RegisterViewSet(ModelViewSet, TokenObtainPairView):
   serializer_class = RegisterSerializer
   permission_classes = (AllowAny,)
   http_method_names = ['post']

   def create(self, request, *args, **kwargs):
      serializer = self.get_serializer(data=request.data)
      serializer.is_valid(raise_exception=True)
      user = serializer.save()
      refresh = RefreshToken.for_user(user)
      res = {
         "refresh": str(refresh),
         "access": str(refresh.access_token),
      }

      return Response({
         "user": serializer.data,
         "refresh": res['refresh'],
         "token": res['access'],
      }, status=status.HTTP_201_CREATED)
   
class RefreshViewSet(viewsets.ViewSet, TokenRefreshView):
   permission_classes = (AllowAny,)
   http_method_names = ['post']

   def create(self, request, *args, **kwargs):
      serializer = self.get_serializer(data=request.data)
      try:
         serializer.is_valid(raise_exception=True)
      except TokenError as e:
         raise InvalidToken(e.args[0])
      return Response(serializer.validated_data, status=status.HTTP_200_OK)