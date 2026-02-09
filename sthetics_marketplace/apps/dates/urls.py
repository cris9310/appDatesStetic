from django.urls import path
from .views import *

urlpatterns = [
    path('appointments/', AppointmentListCreateView.as_view(), name='appointment-list-create'),
    path('appointments/<int:pk>/', AppointmentRetrieveUpdateDestroyView.as_view(), name='appointment-detail'),
    path('locations/availability/<int:location_id>/<int:service_id>/<str:dateFilter>/', LocationAvailabilityView.as_view(), name='location-availability'),
]