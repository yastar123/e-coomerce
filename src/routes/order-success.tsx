import { createFileRoute } from '@tanstack/react-router';
import { useEffect, useState } from 'react';
import { Link, useRouter } from '@/lib/next-shims';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { CheckCircle2, Package, Truck, MapPin, ArrowRight, Download } from 'lucide-react';
import { downloadInvoicePDF } from '@/lib/invoice-pdf';

export const Route = createFileRoute('/order-success')({
  head: () => ({ meta: [{ title: 'Pesanan Berhasil — Aerova' }, { name: 'description', content: 'Terima kasih! Pesanan Aerova Anda telah kami terima.' }] }),
  component: OrderSuccessPage,
});

const formatPrice = (p: number) => `Rp ${p.toLocaleString('id-ID')}`;

const methodLabels: Record<string, string> = {
  qris: 'QRIS', va: 'Virtual Account', ewallet: 'E-Wallet', card: 'Kartu Kredit/Debit',
};

function OrderSuccessPage() {
  const router = useRouter();
  const [order, setOrder] = useState<any>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const raw = sessionStorage.getItem('aerova_order');
    if (!raw) { router.replace('/'); return; }
    setOrder(JSON.parse(raw));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!order) return null;
  const { orderId, method, summary, shipping, paidAt } = order;

  return (
    <div className="min-h-screen bg-[#fafbfc] text-[#1e293b] flex flex-col">
      <Header cartCount={0} onCartClick={() => router.push('/cart')} />
      <main className="flex-1 max-w-4xl w-full mx-auto px-4 md:px-6 py-10 md:py-16">
        <div className="text-center mb-10">
          <div className="w-20 h-20 mx-auto rounded-full bg-[#dcfce7] flex items-center justify-center mb-5">
            <CheckCircle2 className="w-10 h-10 text-[#16a34a]" />
          </div>
          <h1 className="font-sans text-4xl md:text-5xl mb-3">Pembayaran berhasil</h1>
          <p className="text-[#64748b] max-w-md mx-auto">Terima kasih, {shipping.name.split(' ')[0]}! Pesanan Anda telah kami terima dan sedang diproses.</p>
          <div className="mt-5 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-[#e8ecf1] text-xs font-semibold">
            <span className="text-[#94a3b8] uppercase tracking-widest">Nomor Pesanan</span>
            <span className="text-[#1e293b]">{orderId}</span>
          </div>
        </div>

        <div className="bg-white border border-[#e8ecf1] rounded-3xl overflow-hidden mb-6">
          <div className="p-6 md:p-8 border-b border-[#e8ecf1]">
            <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-[#94a3b8] mb-4">Status Pengiriman</h2>
            <div className="flex items-center justify-between relative">
              <div className="absolute top-5 left-8 right-8 h-0.5 bg-[#e8ecf1]" />
              <div className="absolute top-5 left-8 w-1/3 h-0.5 bg-[#00B4E6]" />
              <Step icon={CheckCircle2} label="Dibayar" active done />
              <Step icon={Package} label="Diproses" active />
              <Step icon={Truck} label="Dikirim" />
              <Step icon={MapPin} label="Tiba" />
            </div>
          </div>

          <div className="p-6 md:p-8 grid grid-cols-1 md:grid-cols-2 gap-6 border-b border-[#e8ecf1]">
            <div>
              <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-[#94a3b8] mb-2">Alamat Pengiriman</h3>
              <div className="text-sm">
                <div className="font-semibold">{shipping.name}</div>
                <div className="text-[#64748b]">{shipping.phone} · {shipping.email}</div>
                <div className="text-[#64748b] mt-1">{shipping.address}</div>
                <div className="text-[#64748b]">{shipping.city} {shipping.postal}</div>
              </div>
            </div>
            <div>
              <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-[#94a3b8] mb-2">Metode & Pengiriman</h3>
              <div className="text-sm space-y-1">
                <div><span className="text-[#64748b]">Pembayaran:</span> <b>{methodLabels[method]}</b></div>
                <div><span className="text-[#64748b]">Pengiriman:</span> <b>{shipping.shippingLabel}</b> ({shipping.shippingEta})</div>
                <div><span className="text-[#64748b]">Waktu:</span> {new Date(paidAt).toLocaleString('id-ID')}</div>
              </div>
            </div>
          </div>

          <div className="p-6 md:p-8 border-b border-[#e8ecf1]">
            <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-[#94a3b8] mb-4">Item Pesanan</h3>
            <div className="space-y-3">
              {summary.items.map((it: any) => (
                <div key={it.id} className="flex gap-3 items-center">
                  <img src={it.image} alt={it.name} className="w-14 h-14 rounded-xl object-cover bg-[#fafbfc]" />
                  <div className="flex-1 min-w-0">
                    <div className="text-sm">{it.name}</div>
                    <div className="text-xs text-[#94a3b8]">×{it.quantity} · {formatPrice(it.price)}</div>
                  </div>
                  <div className="text-sm font-semibold">{formatPrice(it.price * it.quantity)}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="p-6 md:p-8 space-y-2 text-sm">
            <div className="flex justify-between"><span className="text-[#64748b]">Subtotal</span><span>{formatPrice(summary.subtotal)}</span></div>
            {summary.discountAmount > 0 && <div className="flex justify-between"><span className="text-[#64748b]">Diskon</span><span className="text-[#00B4E6]">-{formatPrice(summary.discountAmount)}</span></div>}
            <div className="flex justify-between"><span className="text-[#64748b]">Pengiriman</span><span>{shipping.shippingPrice === 0 ? 'GRATIS' : formatPrice(shipping.shippingPrice)}</span></div>
            <div className="flex items-baseline justify-between pt-3 mt-2 border-t border-[#e8ecf1]">
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#94a3b8]">Total Dibayar</span>
              <span className="font-sans text-2xl">{formatPrice(summary.total)}</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <button onClick={() => downloadInvoicePDF(order)} className="flex-1 inline-flex items-center justify-center gap-2 bg-white border border-[#e8ecf1] px-6 py-3.5 rounded-full text-sm font-semibold hover:border-[#1e293b] transition-all">
            <Download className="w-4 h-4" /> Download Invoice (PDF)
          </button>
          <Link href="/" className="flex-1">
            <button className="w-full inline-flex items-center justify-center gap-2 bg-[#1e293b] text-white px-6 py-3.5 rounded-full text-sm font-semibold hover:bg-[#00B4E6] transition-all">
              Kembali Belanja <ArrowRight className="w-4 h-4" />
            </button>
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
}

function Step({ icon: Icon, label, active, done }: { icon: any; label: string; active?: boolean; done?: boolean }) {
  return (
    <div className="relative z-10 flex flex-col items-center gap-2">
      <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 ${active ? 'bg-[#00B4E6] border-[#00B4E6] text-white' : 'bg-white border-[#e8ecf1] text-[#94a3b8]'} ${done ? 'bg-[#16a34a] border-[#16a34a]' : ''}`}>
        <Icon className="w-4 h-4" />
      </div>
      <span className={`text-[11px] font-semibold ${active ? 'text-[#1e293b]' : 'text-[#94a3b8]'}`}>{label}</span>
    </div>
  );
}