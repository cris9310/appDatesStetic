from django.shortcuts import render
from rest_framework.permissions import AllowAny, IsAuthenticated
from .models import Subscription, Invoice
from apps.companies.models import Location
from rest_framework.views import APIView
from rest_framework.generics import ListAPIView
from rest_framework.response import Response
from .utils import calculate_price_per_location, generate_invoice_pdf
from .serializers import InvoiceSerializer
from django.http import FileResponse
from rest_framework.decorators import api_view, permission_classes


class SubscriptionDetailView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        subscription = Subscription.objects.get(user=request.user)

        locations_count = Location.objects.filter(
            owner=request.user,
            is_billable=True
        ).count()


        price = calculate_price_per_location(locations_count)
        estimated_total = price * locations_count

        return Response({
            "status": subscription.status,
            "trial_end": subscription.trial_end,
            "current_period_end": subscription.current_period_end,
            "locations_count": locations_count,
            "price_per_location": price,
            "estimated_total": estimated_total
        })

class InvoiceListView(ListAPIView):
    serializer_class = InvoiceSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        subscription = Subscription.objects.get(user=self.request.user)
        return Invoice.objects.filter(subscription=subscription).order_by('-created_at')


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def download_invoice(request, invoice_id):
    invoice = Invoice.objects.get(
        id=invoice_id,
        subscription__user=request.user
    )

    print("Valores de la factura:", invoice.id, invoice.total_amount, invoice.status)

    pdf_buffer = generate_invoice_pdf(invoice)

    return FileResponse(
        pdf_buffer,
        as_attachment=True,
        filename=f"factura_{invoice.id}.pdf",
        content_type="application/pdf"
    )

