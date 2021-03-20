from rest_framework import status, viewsets
from .serializers import CategorySerializer, PdcSerializer, ActionSerializer
from .models import Category, Pdc, Action
from rest_framework.response import Response
# Create your views here.

class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer

    def destroy(self, request, *args, **kwargs):
        response = {'message': 'DELETE method is not allowed'}
        return Response(response, status=status.HTTP_400_BAD_REQUEST)

    def update(self, request, *args, **kwargs):
        response = {'message': 'UPDATE method is not allowed'}
        return Response(response, status=status.HTTP_400_BAD_REQUEST)
        
    def partial_update(self, request, *args, **kwargs):
        response = {'message': 'PATCH method is not allowed'}
        return Response(response, status=status.HTTP_400_BAD_REQUEST)


class PdcViewSet(viewsets.ModelViewSet):
    queryset = Pdc.objects.all()
    serializer_class = PdcSerializer

    def get_queryset(self):
        return self.queryset.filter(userPdc=self.request.user)

    def perform_create(self, serializer):
        serializer.save(userPdc=self.request.user)

    def partial_update(self, request, *args, **kwargs):
        response = {'message': 'PATCH method is not allowed'}
        return Response(response, status=status.HTTP_400_BAD_REQUEST)
    
class ActionViewSet(viewsets.ModelViewSet):
    queryset = Action.objects.all()
    serializer_class = ActionSerializer

    def get_queryset(self):
        return self.queryset.filter(action_user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(action_user=self.request.user)

    def partial_update(self, request, *args, **kwargs):
        response = {'message': 'PATCH method is not allowed'}
        return Response(response, status=status.HTTP_400_BAD_REQUEST)
