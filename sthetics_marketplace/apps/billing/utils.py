
from .models import *
from apps.companies.models import Location
from django.utils import timezone
from dateutil.relativedelta import relativedelta

from io import BytesIO
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Image, Table, TableStyle
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib import colors
from reportlab.lib.units import mm
from reportlab.lib.pagesizes import A4
from django.conf import settings
import os



def calculate_price_per_location(locations_count):
    if locations_count == 1:
        return 55000
    elif locations_count == 2:
        return 45000
    elif 3 <= locations_count <= 5:
        return 40000
    else:
        return 35000
    
 

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
        period_end=timezone.now().date() + relativedelta(months=1),
        total_amount=total,
    )

    for location in locations:
        InvoiceItem.objects.create(
            invoice=invoice,
            location=location,
            price=price
        )

    subscription.status = "active"
    subscription.current_period_start = timezone.now().date()
    subscription.current_period_end = timezone.now().date() + relativedelta(months=1)
    subscription.save()

    return invoice


def generate_invoice_pdf(invoice):
    buffer = BytesIO()

    doc = SimpleDocTemplate(
        buffer,
        pagesize=A4,
        rightMargin=40,
        leftMargin=40,
        topMargin=40,
        bottomMargin=40
    )

    elements = []
    styles = getSampleStyleSheet()
    logo_path = os.path.join(settings.MEDIA_ROOT, "logos/Logo_negro.png")
    

    PRIMARY = colors.HexColor("#6c63ff")

    # ──────────────── HEADER ────────────────

    header_style = ParagraphStyle(
        'HeaderTitle',
        parent=styles['Heading1'],
        fontSize=26,
        textColor=colors.black,
        spaceAfter=6
    )

    normal = ParagraphStyle(
        'NormalCustom',
        parent=styles['Normal'],
        fontSize=10,
        textColor=colors.grey
    )

    bold = ParagraphStyle(
        'BoldCustom',
        parent=styles['Normal'],
        fontSize=10,
        textColor=colors.black
    )

    logo = Image(logo_path, width=50*mm, height=20*mm)
    logo.hAlign = 'LEFT'
    elements.append(logo)
    elements.append(Spacer(1, 10))
    elements.append(Paragraph(f"Factura N° {invoice.id}", normal))
    elements.append(Paragraph(f"Estado de la factura: {'Pagado' if invoice.status == 'paid' else 'Pendiente' if invoice.status == 'pending' else 'Anulada'}", normal))
    elements.append(Spacer(1, 12))


    # ──────────────── BUSINESS + CLIENT ────────────────

    business_data = [
        [Paragraph("<b>DE</b>", bold), ""],
        [Paragraph(invoice.subscription.user.email, normal), ""],
    ]

    client_data = [
        [Paragraph("<b>PARA</b>", bold), ""],
        [Paragraph(invoice.subscription.user.email, normal), ""],
    ]

    from_to_table = Table(
        [
            [
                Paragraph("<b>EMISOR</b><br/>Lookly S.A.S<br/>900.123.456<br/>Calle 44b # 6-46 Cali, Colombia<br/> 310 123 4567", normal),
                Paragraph(
                    f"<b>CLIENTE</b><br/>{invoice.subscription.user.email}<br/>{invoice.subscription.user.name}<br/> {invoice.subscription.user.phone}",
                    normal
                )
            ]
        ],
        colWidths=[250, 250]
    )

    elements.append(from_to_table)
    elements.append(Spacer(1, 20))

    # ──────────────── ITEMS TABLE ────────────────

    data = [
        ["Descripción", "Cantidad", "Precio", "Subtotal"]
    ]

    subtotal = 0
    print("Valores de la factura 2:", invoice.id, invoice.total_amount, invoice.status)
    line_total = invoice.total_amount
    subtotal += line_total - (line_total * 0.19)

    data.append([
        f"Periodo {invoice.period_start} - {invoice.period_end}",
        "1",
        f"${invoice.total_amount:,.0f}",
        f"${line_total:,.0f}"
    ])

    tax = round(line_total * 0.19)
    total = subtotal + tax

    table = Table(data, colWidths=[220, 70, 90, 90])

    table.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, 0), PRIMARY),
        ('TEXTCOLOR', (0, 0), (-1, 0), colors.white),
        ('FONTNAME', (0, 0), (-1, 0), 'Helvetica-Bold'),
        ('ALIGN', (1, 1), (-1, -1), 'RIGHT'),
        ('ALIGN', (0, 0), (0, -1), 'LEFT'),
        ('GRID', (0, 0), (-1, -1), 0.5, colors.lightgrey),
        ('ROWBACKGROUNDS', (0, 1), (-1, -1), [colors.whitesmoke, colors.transparent]),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 8),
        ('TOPPADDING', (0, 0), (-1, -1), 8),
    ]))

    elements.append(table)
    elements.append(Spacer(1, 25))

    # ──────────────── TOTALS ────────────────

    totals_data = [
        ["Subtotal", f"${subtotal:,.0f}"],
        ["IVA (19%)", f"${tax:,.0f}"],
        ["TOTAL", f"${total:,.0f}"],
    ]

    totals_table = Table(totals_data, colWidths=[350, 120])

    totals_table.setStyle(TableStyle([
        ('ALIGN', (1, 0), (-1, -1), 'RIGHT'),
        ('FONTNAME', (0, -1), (-1, -1), 'Helvetica-Bold'),
        ('FONTSIZE', (0, -1), (-1, -1), 14),
        ('TEXTCOLOR', (0, -1), (-1, -1), PRIMARY),
        ('LINEABOVE', (0, -1), (-1, -1), 1, colors.grey),
        ('TOPPADDING', (0, -1), (-1, -1), 10),
    ]))

    elements.append(totals_table)
    elements.append(Spacer(1, 30))

    # ──────────────── FOOTER ────────────────


    doc.build(elements)

    buffer.seek(0)
    return buffer




