from rest_framework.routers import DefaultRouter
from .views import *

router = DefaultRouter()
router.register(r'cities', CityViewSet)
router.register(r'locations', LocationViewSet)

urlpatterns = router.urls