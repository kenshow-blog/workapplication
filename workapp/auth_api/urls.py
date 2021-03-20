from django.urls import include, path
from rest_framework import routers
from .views import CreateUserView, LoginUserView, ProfileViewSet

router = routers.DefaultRouter()
router.register('profile', ProfileViewSet)

urlpatterns = [
    path('', include(router.urls), name="profile"),
    path('loginuser/', LoginUserView.as_view(), name="loginuser"),
    path('create/', CreateUserView.as_view(), name="create"),
   
]