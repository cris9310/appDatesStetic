from rest_framework.routers import DefaultRouter
from .views import *

router = DefaultRouter()
router.register(r'cities', CityViewSet)
router.register(r'locations', LocationViewSet)
router.register(r'Category', CategoryViewSet)

urlpatterns = router.urls