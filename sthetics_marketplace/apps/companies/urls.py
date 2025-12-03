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
    path('List-my-locations/', LocationListUserViewSet.as_view(), name='List-my-locations'),
    path("app/locations/", LocationViewSetMobileApp.as_view(), name="locations-app"),
    
]