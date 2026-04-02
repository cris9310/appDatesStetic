from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import *

router = DefaultRouter()

urlpatterns = [
    path('', include(router.urls)),
    
    path('get-detail-suscription/', SubscriptionDetailView.as_view(), name='get-detail-suscription'),
    path('get-invoices/', InvoiceListView.as_view(), name='get-invoices'),
    path('invoice/<int:invoice_id>/download/', download_invoice, name='download-invoice'),
]