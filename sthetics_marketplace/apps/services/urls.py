from rest_framework.routers import DefaultRouter
from .views import *

router = DefaultRouter()
router.register(r'services', ServiceViewSet)

urlpatterns = router.urls