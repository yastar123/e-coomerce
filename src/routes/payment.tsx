import { createFileRoute } from '@tanstack/react-router';
import { useEffect, useState } from 'react';
import { Link, useRouter } from '@/lib/next-shims';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { ArrowLeft, ArrowRight, CreditCard, Wallet, Building2, QrCode, ShieldCheck, Loader2 } from 'lucide-react';

export const Route = createFileRoute('/payment')({
  head: () => ({ meta: [{ title: 'Pembayaran — Aerova' }, { name: 'description', content: 'Pilih metode pembayaran untuk pesanan Aerova Anda.' }] }),
  component: PaymentPage,
});

const formatPrice = (p: number) => `Rp ${p.toLocaleString('id-ID')}`;

const methods = [
  { id: 'qris', name: 'QRIS', desc: 'Scan pakai aplikasi bank/e-wallet apa saja', icon: QrCode },
  { id: 'va', name: 'Virtual Account (BCA, Mandiri, BNI)', desc: 'Transfer melalui ATM/Mobile Banking', icon: Building2 },
  { id: 'ewallet', name: 'E-Wallet (GoPay, OVO, DANA)', desc: 'Bayar dari saldo dompet digital', icon: Wallet },
  { id: 'card', name: 'Kartu Kredit / Debit', desc: 'Visa, Mastercard, JCB', icon: CreditCard },
];

function PaymentPage() {
  const router = useRouter();
  const [summary, setSummary] = useState<any>(null);
  const [shipping, setShipping] = useState<any>(null);
  const [method, setMethod] = useState('qris');
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const s = sessionStorage.getItem('aerova_checkout');
    const sh = sessionStorage.getItem('aerova_shipping');
    if (!s || !sh) { router.replace('/cart'); return; }
    setSummary(JSON.parse(s));
    setShipping(JSON.parse(sh));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const pay = () => {
    setProcessing(true);
    setTimeout(() => {
      const orderId = 'AER-' + Date.now().toString().slice(-8);
      sessionStorage.setItem('aerova_order', JSON.stringify({
        orderId, method, summary, shipping, paidAt: new Date().toISOString(),
      }));
      sessionStorage.removeItem('aerova_checkout');
      sessionStorage.removeItem('aerova_shipping');
      router.replace('/order-success');
    }, 1800);
  };

  if (!summary || !shipping) return null;

  return (
    <div className="min-h-screen bg-[#fafbfc] text-[#1e293b] flex flex-col">
      <Header cartCount={summary.items.length} onCartClick={() => router.push('/cart')} />
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 md:px-6 py-8 md:py-10">
        <Link href="/checkout" className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-[#94a3b8] hover:text-[#1e293b] mb-6 transition-colors">
          <ArrowLeft className="w-3.5 h-3.5" /> Kembali ke alamat
        </Link>

        <div className="flex items-center gap-2 mb-8 text-xs font-semibold uppercase tracking-widest text-[#94a3b8]">
          <span>1. Keranjang</span><span>›</span>
          <span>2. Alamat</span><span>›</span>
          <span className="text-[#00B4E6]">3. Pembayaran</span><span>›</span>
          <span>4. Selesai</span>
        </div>

        <h1 className="font-sans text-3xl md:text-4xl mb-6">Pilih metode pembayaran</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-3">
            {methods.map((m) => (
              <label key={m.id} className={`flex items-center gap-4 p-5 rounded-2xl border cursor-pointer transition-all bg-white ${method === m.id ? 'border-[#00B4E6] ring-2 ring-[#00B4E6]/20' : 'border-[#e8ecf1] hover:border-[#cbd5e1]'}`}>
                <input type="radio" name="method" value={m.id} checked={method === m.id} onChange={() => setMethod(m.id)} className="accent-[#00B4E6]" />
                <div className="w-12 h-12 rounded-xl bg-[#f0fbff] flex items-center justify-center">
                  <m.icon className="w-5 h-5 text-[#00B4E6]" />
                </div>
                <div className="flex-1">
                  <div className="font-semibold text-sm">{m.name}</div>
                  <div className="text-xs text-[#94a3b8]">{m.desc}</div>
                </div>
              </label>
            ))}

            <div className="mt-6 flex items-start gap-3 p-4 rounded-2xl bg-[#f0fbff] border border-[#bae6fd] text-xs text-[#0369a1]">
              <ShieldCheck className="w-4 h-4 mt-0.5 shrink-0" />
              <span>Ini adalah <b>simulasi pembayaran</b>. Tidak ada transaksi asli yang diproses.</span>
            </div>
          </div>

          <aside className="lg:col-span-1">
            <div className="bg-white border border-[#e8ecf1] rounded-3xl p-6 md:p-8 sticky top-24 space-y-4">
              <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-[#94a3b8]">Ringkasan</h2>
              <div className="text-sm text-[#64748b]">
                <div className="font-semibold text-[#1e293b]">{shipping.name}</div>
                <div>{shipping.phone}</div>
                <div className="mt-1">{shipping.address}, {shipping.city} {shipping.postal}</div>
                <div className="mt-2 text-xs">Pengiriman: {shipping.shippingLabel} ({shipping.shippingEta})</div>
              </div>
              <div className="pt-4 border-t border-[#e8ecf1] space-y-2 text-sm">
                <div className="flex justify-between"><span className="text-[#64748b]">Subtotal</span><span>{formatPrice(summary.subtotal)}</span></div>
                {summary.discountAmount > 0 && <div className="flex justify-between"><span className="text-[#64748b]">Diskon</span><span className="text-[#00B4E6]">-{formatPrice(summary.discountAmount)}</span></div>}
                <div className="flex justify-between"><span className="text-[#64748b]">Pengiriman</span><span>{shipping.shippingPrice === 0 ? 'GRATIS' : formatPrice(shipping.shippingPrice)}</span></div>
              </div>
              <div className="flex items-baseline justify-between pt-4 border-t border-[#e8ecf1]">
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#94a3b8]">Total Bayar</span>
                <span className="font-sans text-2xl">{formatPrice(summary.total)}</span>
              </div>
              <button onClick={pay} disabled={processing} className="w-full inline-flex items-center justify-center gap-2 bg-[#1e293b] text-white px-6 py-3.5 rounded-full text-sm font-semibold hover:bg-[#00B4E6] transition-all disabled:opacity-70">
                {processing ? (<><Loader2 className="w-4 h-4 animate-spin" /> Memproses...</>) : (<>Bayar Sekarang <ArrowRight className="w-4 h-4" /></>)}
              </button>
            </div>
          </aside>
        </div>
      </main>
      <Footer />
    </div>
  );
}