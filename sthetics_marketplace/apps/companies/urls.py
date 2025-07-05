from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import *

router = DefaultRouter()
router.register(r'cities', CityViewSet)
router.register(r'locations', LocationViewSet)
router.register(r'Category', CategoryViewSet)

urlpatterns = [
    path('', include(router.urls)),
    
    path('verify-forms/', VerifiedFormsViewSet.as_view(), name='verify-forms'),
    
]