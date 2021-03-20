from rest_framework import status, permissions, generics, viewsets
from .serializers import UserSerializer, ProfileSerializer
from rest_framework.response import Response
from .models import Profile
# Create your views here.


class CreateUserView(generics.CreateAPIView):
    serializer_class = UserSerializer
    permission_classes = (permissions.AllowAny,)


class LoginUserView(generics.RetrieveUpdateAPIView):
    serializer_class = UserSerializer

    def get_object(self):
        return self.request.user
    
    def update(self, request, *args, **kwargs):
        response = {'message': 'PUT method is not allowed'}
        return Response(response, status=status.HTTP_400_BAD_REQUEST)

class ProfileViewSet(viewsets.ModelViewSet):
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer

    def perform_create(self, serializer):
        serializer.save(user_profile=self.request.user)
    # def get_object(self):
    #     return self.request.user
    def get_queryset(self):
        return self.queryset.filter(user_profile=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user_profile=self.request.user)
    
    def destroy(self, request, *args, **kwargs):
        response = {'messeage': 'DELETE method is not allowed'}
        return Response(response, status=status.HTTP_400_BAD_REQUEST)
    def partial_update(self, request, *args, **kwargs):
        response = {'message': 'PATCH method is not allowed'}
        return Response(response, status=status.HTTP_400_BAD_REQUEST)

