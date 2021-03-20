from django.urls import include, path
from rest_framework import routers
from .views import CategoryViewSet, PdcViewSet, ActionViewSet

router = routers.DefaultRouter()
router.register('category', CategoryViewSet)
router.register('pdc', PdcViewSet)
router.register('action', ActionViewSet)

urlpatterns = [
    path('', include(router.urls))
]