import { createFileRoute } from '@tanstack/react-router';
import { useEffect, useState } from 'react';
import { Link, useRouter } from '@/lib/next-shims';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { ArrowLeft, ArrowRight, MapPin, User, Phone, Mail, Home, Truck } from 'lucide-react';

export const Route = createFileRoute('/checkout')({
  head: () => ({ meta: [{ title: 'Checkout — Aerova' }, { name: 'description', content: 'Isi alamat pengiriman untuk pesanan Aerova Anda.' }] }),
  component: CheckoutPage,
});

const formatPrice = (p: number) => `Rp ${p.toLocaleString('id-ID')}`;

interface Summary {
  items: { id: string; name: string; price: number; image: string; quantity: number }[];
  subtotal: number;
  discount: number;
  discountAmount: number;
  shippingCost: number;
  total: number;
}

function CheckoutPage() {
  const router = useRouter();
  const [summary, setSummary] = useState<Summary | null>(null);
  const [form, setForm] = useState({
    name: '', email: '', phone: '', address: '', city: '', postal: '', notes: '', shipping: 'reguler',
  });

  useEffect(() => {
    const raw = typeof window !== 'undefined' ? sessionStorage.getItem('aerova_checkout') : null;
    if (!raw) { router.replace('/cart'); return; }
    setSummary(JSON.parse(raw));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const shippingOptions = [
    { id: 'reguler', name: 'Reguler', eta: '2–3 hari', price: summary?.shippingCost ?? 0 },
    { id: 'express', name: 'Express', eta: 'Besok tiba', price: 45000 },
  ];
  const chosenShipping = shippingOptions.find((s) => s.id === form.shipping)!;
  const total = summary ? summary.subtotal - summary.discountAmount + chosenShipping.price : 0;

  const canSubmit = form.name && form.email && form.phone && form.address && form.city && form.postal;

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit || !summary) return;
    sessionStorage.setItem('aerova_checkout', JSON.stringify({ ...summary, shippingCost: chosenShipping.price, total }));
    sessionStorage.setItem('aerova_shipping', JSON.stringify({ ...form, shippingLabel: chosenShipping.name, shippingEta: chosenShipping.eta, shippingPrice: chosenShipping.price }));
    router.push('/payment');
  };

  if (!summary) return null;

  return (
    <div className="min-h-screen bg-[#fafbfc] text-[#1e293b] flex flex-col">
      <Header cartCount={summary.items.length} onCartClick={() => router.push('/cart')} />
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 md:px-6 py-8 md:py-10">
        <Link href="/cart" className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-[#94a3b8] hover:text-[#1e293b] mb-6 transition-colors">
          <ArrowLeft className="w-3.5 h-3.5" /> Kembali ke keranjang
        </Link>

        <div className="flex items-center gap-2 mb-8 text-xs font-semibold uppercase tracking-widest text-[#94a3b8]">
          <span className="text-[#1e293b]">1. Keranjang</span>
          <span>›</span>
          <span className="text-[#00B4E6]">2. Alamat</span>
          <span>›</span>
          <span>3. Pembayaran</span>
          <span>›</span>
          <span>4. Selesai</span>
        </div>

        <h1 className="font-sans text-3xl md:text-4xl mb-6">Alamat pengiriman</h1>

        <form onSubmit={submit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <section className="bg-white border border-[#e8ecf1] rounded-3xl p-6 md:p-8 space-y-4">
              <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-[#94a3b8] mb-2">Data Kontak</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Field icon={User} label="Nama lengkap" value={form.name} onChange={(v) => setForm({ ...form, name: v })} placeholder="Budi Santoso" />
                <Field icon={Phone} label="No. handphone" value={form.phone} onChange={(v) => setForm({ ...form, phone: v })} placeholder="0812xxxxxxx" />
                <div className="md:col-span-2">
                  <Field icon={Mail} label="Email" type="email" value={form.email} onChange={(v) => setForm({ ...form, email: v })} placeholder="nama@email.com" />
                </div>
              </div>
            </section>

            <section className="bg-white border border-[#e8ecf1] rounded-3xl p-6 md:p-8 space-y-4">
              <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-[#94a3b8] mb-2">Alamat Pengiriman</h2>
              <Field icon={Home} label="Alamat lengkap" value={form.address} onChange={(v) => setForm({ ...form, address: v })} placeholder="Jl. Melati No. 12, RT 03 RW 05" />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Field icon={MapPin} label="Kota" value={form.city} onChange={(v) => setForm({ ...form, city: v })} placeholder="Jakarta Selatan" />
                <Field icon={MapPin} label="Kode pos" value={form.postal} onChange={(v) => setForm({ ...form, postal: v })} placeholder="12345" />
              </div>
              <label className="block">
                <span className="block text-xs font-semibold text-[#64748b] mb-1.5">Catatan (opsional)</span>
                <textarea value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} rows={3} className="w-full px-4 py-3 rounded-2xl border border-[#e8ecf1] focus:border-[#00B4E6] focus:outline-none text-sm" placeholder="Titip ke satpam, dsb." />
              </label>
            </section>

            <section className="bg-white border border-[#e8ecf1] rounded-3xl p-6 md:p-8 space-y-3">
              <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-[#94a3b8] mb-2">Metode Pengiriman</h2>
              {shippingOptions.map((s) => (
                <label key={s.id} className={`flex items-center gap-4 p-4 rounded-2xl border cursor-pointer transition-all ${form.shipping === s.id ? 'border-[#00B4E6] bg-[#f0fbff]' : 'border-[#e8ecf1] hover:border-[#cbd5e1]'}`}>
                  <input type="radio" name="shipping" value={s.id} checked={form.shipping === s.id} onChange={() => setForm({ ...form, shipping: s.id })} className="accent-[#00B4E6]" />
                  <Truck className="w-5 h-5 text-[#64748b]" />
                  <div className="flex-1">
                    <div className="font-semibold text-sm">{s.name}</div>
                    <div className="text-xs text-[#94a3b8]">{s.eta}</div>
                  </div>
                  <div className="font-semibold text-sm">{s.price === 0 ? 'GRATIS' : formatPrice(s.price)}</div>
                </label>
              ))}
            </section>
          </div>

          <aside className="lg:col-span-1">
            <div className="bg-white border border-[#e8ecf1] rounded-3xl p-6 md:p-8 sticky top-24 space-y-4">
              <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-[#94a3b8]">Ringkasan Pesanan</h2>
              <div className="space-y-3 pb-4 border-b border-[#e8ecf1]">
                {summary.items.map((it) => (
                  <div key={it.id} className="flex gap-3 items-center">
                    <img src={it.image} alt={it.name} className="w-12 h-12 rounded-xl object-cover bg-[#fafbfc]" />
                    <div className="flex-1 min-w-0">
                      <div className="text-sm truncate">{it.name}</div>
                      <div className="text-xs text-[#94a3b8]">×{it.quantity}</div>
                    </div>
                    <div className="text-sm font-semibold">{formatPrice(it.price * it.quantity)}</div>
                  </div>
                ))}
              </div>
              <Row label="Subtotal" value={formatPrice(summary.subtotal)} />
              {summary.discountAmount > 0 && <Row label={`Diskon ${summary.discount}%`} value={`-${formatPrice(summary.discountAmount)}`} accent />}
              <Row label="Pengiriman" value={chosenShipping.price === 0 ? 'GRATIS' : formatPrice(chosenShipping.price)} />
              <div className="flex items-baseline justify-between pt-4 border-t border-[#e8ecf1]">
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#94a3b8]">Total</span>
                <span className="font-sans text-2xl">{formatPrice(total)}</span>
              </div>
              <button type="submit" disabled={!canSubmit} className="w-full inline-flex items-center justify-center gap-2 bg-[#1e293b] text-white px-6 py-3.5 rounded-full text-sm font-semibold hover:bg-[#00B4E6] transition-all disabled:opacity-40 disabled:cursor-not-allowed">
                Lanjut ke Pembayaran <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </aside>
        </form>
      </main>
      <Footer />
    </div>
  );
}

function Field({ icon: Icon, label, value, onChange, placeholder, type = 'text' }: { icon: any; label: string; value: string; onChange: (v: string) => void; placeholder?: string; type?: string }) {
  return (
    <label className="block">
      <span className="block text-xs font-semibold text-[#64748b] mb-1.5">{label}</span>
      <div className="relative">
        <Icon className="w-4 h-4 text-[#94a3b8] absolute left-4 top-1/2 -translate-y-1/2" />
        <input type={type} value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} className="w-full pl-11 pr-4 py-3 rounded-full border border-[#e8ecf1] focus:border-[#00B4E6] focus:outline-none text-sm" />
      </div>
    </label>
  );
}

function Row({ label, value, accent }: { label: string; value: string; accent?: boolean }) {
  return (
    <div className="flex justify-between text-sm">
      <span className="text-[#64748b]">{label}</span>
      <span className={`font-semibold ${accent ? 'text-[#00B4E6]' : ''}`}>{value}</span>
    </div>
  );
}