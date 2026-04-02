
from .models import *
from apps.companies.models import Location
from django.utils import timezone
from datetime import timedelta


from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Image, Table, TableStyle
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib import colors
from reportlab.lib.units import mm



def calculate_price_per_location(locations_count):
    if locations_count == 1:
        return 55000
    elif locations_count == 2:
        return 45000
    elif 3 <= locations_count <= 5:
        return 40000
    else:
        return 35000
    
    from datetime import date
from dateutil.relativedelta import relativedelta

def generate_invoice(subscription):

    locations = Location.objects.filter(
        owner=subscription.user,
        is_billable=True
    )

    count = locations.count()

    if count == 0:
        return None

    price = calculate_price_per_location(count)
    total = price * count

    invoice = Invoice.objects.create(
        subscription=subscription,
        period_start=timezone.now().date(),
        period_end=timezone.now().date() + timedelta(months=1),
        total_amount=total,
    )

    for location in locations:
        InvoiceItem.objects.create(
            invoice=invoice,
            location=location,
            price=price
        )

    subscription.status = "active"
    subscription.current_period_start = timezone.now().date(),
    subscription.current_period_end = timezone.now().date() + relativedelta(months=1)
    subscription.save()

    return invoice


def generate_invoice_pdf(invoice):
    doc = SimpleDocTemplate("invoice.pdf")

    elements = []

    # Logo
    elements.append(Image("logo.png", width=40*mm, height=20*mm))

    # Título personalizado
    title_style = ParagraphStyle(
        'title',
        fontSize=18,
        textColor=colors.HexColor("#6c63ff"),
        spaceAfter=20
    )

    elements.append(Paragraph("FACTURA", title_style))

    # Datos cliente
    elements.append(Paragraph(f"Cliente: {invoice.user.email}", ParagraphStyle('normal', fontSize=12)))
    elements.append(Spacer(1, 10))

    # Tabla servicios
    data = [
        ["Servicio", "Precio"],
        ["Corte", "$20"],
        ["Barba", "$10"],
    ]

    table = Table(data, colWidths=[300, 100])

    table.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,0), colors.HexColor("#6c63ff")),
        ('TEXTCOLOR', (0,0), (-1,0), colors.white),
        ('GRID', (0,0), (-1,-1), 1, colors.grey),
        ('ALIGN', (1,1), (-1,-1), 'RIGHT'),
    ]))

    elements.append(table)

    elements.append(Spacer(1, 20))
    elements.append(Paragraph(f"TOTAL: ${invoice.total}", title_style))

    doc.build(elements)