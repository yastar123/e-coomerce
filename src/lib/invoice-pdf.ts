import jsPDF from 'jspdf';

const formatPrice = (p: number) => `Rp ${p.toLocaleString('id-ID')}`;

const methodLabels: Record<string, string> = {
  qris: 'QRIS',
  va: 'Virtual Account',
  ewallet: 'E-Wallet',
  card: 'Kartu Kredit/Debit',
};

const COMPANY = {
  name: 'PT Aerova',
  tagline: 'Aerova Air Mineral',
  address: 'Jl. Sumber Air Murni No. 88, Bogor, Jawa Barat 16110',
  phone: '+62 21 5000 8888',
  email: 'halo@aerova.co.id',
  web: 'www.aerova.co.id',
  npwp: '01.234.567.8-901.000',
  logo: '/logo.jpg',
};

async function loadImageDataURL(url: string): Promise<string | null> {
  try {
    const res = await fetch(url);
    const blob = await res.blob();
    return await new Promise((resolve, reject) => {
      const fr = new FileReader();
      fr.onload = () => resolve(fr.result as string);
      fr.onerror = reject;
      fr.readAsDataURL(blob);
    });
  } catch {
    return null;
  }
}

export async function downloadInvoicePDF(order: any) {
  const { orderId, method, summary, shipping, paidAt } = order;
  const doc = new jsPDF({ unit: 'mm', format: 'a4' });
  const pageW = 210;
  const margin = 15;
  const logoSize = 20;
  const textX = margin + logoSize + 5;
  let y = 18;

  // Brand bar
  doc.setFillColor(0, 180, 230);
  doc.rect(0, 0, pageW, 6, 'F');

  // Logo
  const logoData = await loadImageDataURL(COMPANY.logo);
  if (logoData) {
    try {
      doc.addImage(logoData, 'JPEG', margin, y - 5, logoSize, logoSize);
    } catch {
      // ignore if unsupported
    }
  }

  // Company header
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(18);
  doc.setTextColor(30, 41, 59);
  doc.text(COMPANY.name, textX, y);
  y += 5;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(100, 116, 139);
  doc.text(COMPANY.tagline, textX, y);
  y += 4;
  doc.text(COMPANY.address, textX, y);
  y += 4;
  doc.text(`Telp: ${COMPANY.phone}  |  ${COMPANY.email}  |  ${COMPANY.web}`, textX, y);
  y += 4;
  doc.text(`NPWP: ${COMPANY.npwp}`, textX, y);

  // INVOICE label right
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(26);
  doc.setTextColor(30, 41, 59);
  doc.text('INVOICE', pageW - margin, 22, { align: 'right' });
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(100, 116, 139);
  doc.text(`No: ${orderId}`, pageW - margin, 28, { align: 'right' });
  doc.text(`Tanggal: ${new Date(paidAt).toLocaleString('id-ID')}`, pageW - margin, 32, { align: 'right' });
  doc.setTextColor(22, 163, 74);
  doc.setFont('helvetica', 'bold');
  doc.text('STATUS: LUNAS', pageW - margin, 37, { align: 'right' });

  y = 50;
  doc.setDrawColor(232, 236, 241);
  doc.line(margin, y, pageW - margin, y);
  y += 8;

  // Bill To
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.setTextColor(30, 41, 59);
  doc.text('DITAGIHKAN KEPADA', margin, y);
  doc.text('DIKIRIM KE', pageW / 2, y);
  y += 5;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(51, 65, 85);
  doc.text(shipping.name, margin, y);
  doc.text(shipping.name, pageW / 2, y);
  y += 4;
  doc.text(shipping.email, margin, y);
  const addrLines = doc.splitTextToSize(shipping.address, 85);
  doc.text(addrLines, pageW / 2, y);
  y += 4;
  doc.text(shipping.phone, margin, y);
  y += 4 * Math.max(1, addrLines.length - 1);
  doc.text(`${shipping.city} ${shipping.postal}`, pageW / 2, y - (4 * Math.max(0, addrLines.length - 1)) + 4);

  y += 8;

  // Table header
  const colX = { no: margin, name: margin + 10, qty: 120, price: 140, total: pageW - margin };
  doc.setFillColor(30, 41, 59);
  doc.rect(margin, y, pageW - margin * 2, 8, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.text('#', colX.no + 1, y + 5.5);
  doc.text('DESKRIPSI PRODUK', colX.name, y + 5.5);
  doc.text('QTY', colX.qty, y + 5.5, { align: 'right' });
  doc.text('HARGA', colX.price, y + 5.5, { align: 'right' });
  doc.text('SUBTOTAL', colX.total, y + 5.5, { align: 'right' });
  y += 8;

  // Table rows
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(30, 41, 59);
  summary.items.forEach((it: any, idx: number) => {
    const rowH = 8;
    if (idx % 2 === 1) {
      doc.setFillColor(250, 251, 252);
      doc.rect(margin, y, pageW - margin * 2, rowH, 'F');
    }
    doc.setFontSize(9);
    doc.text(String(idx + 1), colX.no + 1, y + 5.5);
    const nameLines = doc.splitTextToSize(it.name, 95);
    doc.text(nameLines[0], colX.name, y + 5.5);
    doc.text(String(it.quantity), colX.qty, y + 5.5, { align: 'right' });
    doc.text(formatPrice(it.price), colX.price, y + 5.5, { align: 'right' });
    doc.text(formatPrice(it.price * it.quantity), colX.total, y + 5.5, { align: 'right' });
    y += rowH;
  });

  doc.setDrawColor(232, 236, 241);
  doc.line(margin, y, pageW - margin, y);
  y += 6;

  // Totals
  const totalsX = pageW - margin;
  const labelX = pageW - margin - 60;
  doc.setFontSize(9);
  doc.setTextColor(100, 116, 139);
  doc.text('Subtotal', labelX, y);
  doc.setTextColor(30, 41, 59);
  doc.text(formatPrice(summary.subtotal), totalsX, y, { align: 'right' });
  y += 5;

  if (summary.discountAmount > 0) {
    doc.setTextColor(100, 116, 139);
    doc.text(`Diskon (${summary.discount}%)`, labelX, y);
    doc.setTextColor(0, 180, 230);
    doc.text(`-${formatPrice(summary.discountAmount)}`, totalsX, y, { align: 'right' });
    y += 5;
  }

  doc.setTextColor(100, 116, 139);
  doc.text(`Ongkos Kirim (${shipping.shippingLabel})`, labelX, y);
  doc.setTextColor(30, 41, 59);
  doc.text(shipping.shippingPrice === 0 ? 'GRATIS' : formatPrice(shipping.shippingPrice), totalsX, y, { align: 'right' });
  y += 7;

  doc.setDrawColor(30, 41, 59);
  doc.setLineWidth(0.4);
  doc.line(labelX, y - 3, totalsX, y - 3);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(12);
  doc.setTextColor(30, 41, 59);
  doc.text('TOTAL DIBAYAR', labelX, y + 2);
  doc.text(formatPrice(summary.total), totalsX, y + 2, { align: 'right' });
  y += 12;

  // Payment info box
  doc.setFillColor(240, 251, 255);
  doc.setDrawColor(0, 180, 230);
  doc.setLineWidth(0.2);
  doc.roundedRect(margin, y, pageW - margin * 2, 22, 2, 2, 'FD');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.setTextColor(30, 41, 59);
  doc.text('INFORMASI PEMBAYARAN', margin + 4, y + 6);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(51, 65, 85);
  doc.text(`Metode: ${methodLabels[method] ?? method}`, margin + 4, y + 12);
  doc.text(`Waktu Pembayaran: ${new Date(paidAt).toLocaleString('id-ID')}`, margin + 4, y + 17);
  doc.setTextColor(22, 163, 74);
  doc.setFont('helvetica', 'bold');
  doc.text('LUNAS', pageW - margin - 4, y + 14, { align: 'right' });
  y += 30;

  // Footer / notes
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(100, 116, 139);
  const notes = [
    'Terima kasih telah berbelanja di Aerova. Invoice ini merupakan bukti pembayaran resmi',
    'yang sah dan dicetak oleh sistem. Untuk pertanyaan seputar pesanan, hubungi',
    `${COMPANY.email} atau ${COMPANY.phone}.`,
  ];
  notes.forEach((line) => {
    doc.text(line, margin, y);
    y += 4;
  });

  // Bottom bar
  doc.setFillColor(0, 180, 230);
  doc.rect(0, 290, pageW, 7, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(8);
  doc.text(`${COMPANY.name}  •  ${COMPANY.web}`, pageW / 2, 294.5, { align: 'center' });

  doc.save(`Invoice-${orderId}.pdf`);
}
