import { createFileRoute } from '@tanstack/react-router';
import { useState } from 'react';
import { Link, useRouter } from '@/lib/next-shims';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Trash2, Plus, Minus, ShoppingBag, ArrowLeft, ArrowRight, Ticket, ShieldCheck, Truck, RotateCcw } from 'lucide-react';
import { useCart, updateQuantity, removeFromCart, type CartItem as CartItemType } from '@/lib/cart-store';

const formatPrice = (price: number) => `Rp ${price.toLocaleString('id-ID')}`;

function CartPage() {
  const router = useRouter();
  const cartItems = useCart();



  const [promoCode, setPromoCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [promoMessage, setPromoMessage] = useState<{ type: 'ok' | 'err'; text: string } | null>(null);

  const handleUpdateQuantity = (id: string, quantity: number) => {
    updateQuantity(id, quantity);
  };

  const handleRemoveItem = (id: string) => {
    removeFromCart(id);
  };


  const handleApplyPromo = () => {
    const code = promoCode.toUpperCase();
    if (code === 'SAVE10') {
      setDiscount(10);
      setPromoMessage({ type: 'ok', text: 'Diskon 10% berhasil diterapkan.' });
    } else if (code === 'SAVE20') {
      setDiscount(20);
      setPromoMessage({ type: 'ok', text: 'Diskon 20% berhasil diterapkan.' });
    } else {
      setPromoMessage({ type: 'err', text: 'Kode promo tidak valid.' });
    }
    setPromoCode('');
  };

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const discountAmount = Math.floor((subtotal * discount) / 100);
  const shippingCost = subtotal > 100000 ? 0 : 25000;
  const total = subtotal - discountAmount + shippingCost;

  return (
    <div className="min-h-screen bg-[#fafbfc] text-[#1e293b] flex flex-col">
      <Header cartCount={cartItems.length} onCartClick={() => {}} />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 md:px-6 py-8 md:py-10">
        {/* Back link */}
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-[#94a3b8] hover:text-[#1e293b] mb-6 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          Kembali belanja
        </Link>

        {/* Header */}
        <div className="mb-8 md:mb-10">
          <span className="inline-block text-[10px] font-bold uppercase tracking-[0.2em] text-[#00B4E6]">
            Checkout
          </span>
          <h1 className="font-sans text-4xl md:text-5xl text-[#1e293b] leading-tight mt-2">
            Keranjang Belanja
          </h1>
          <p className="text-sm text-[#94a3b8] mt-2">
            {cartItems.length} produk siap dikemas untuk Anda.
          </p>
        </div>

        {cartItems.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
            {/* Items */}
            <div className="lg:col-span-2 space-y-4">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="bg-white border border-[#e8ecf1] rounded-2xl p-4 md:p-5 flex gap-4 md:gap-5"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-24 h-24 md:w-32 md:h-32 rounded-xl object-cover bg-[#fafbfc] shrink-0"
                  />
                  <div className="flex-1 min-w-0 flex flex-col">
                    <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#94a3b8]">
                      {item.category}
                    </p>
                    <h3 className="text-sm md:text-base font-medium text-[#1e293b] mt-1 line-clamp-2">
                      {item.name}
                    </h3>
                    <div className="mt-1 flex items-baseline gap-2 flex-wrap">
                      <span className="text-base md:text-lg font-bold text-[#1e293b]">
                        {formatPrice(item.price)}
                      </span>
                      {item.originalPrice && (
                        <span className="text-xs text-[#94a3b8] line-through">
                          {formatPrice(item.originalPrice)}
                        </span>
                      )}
                    </div>

                    <div className="flex flex-wrap items-center justify-between gap-3 mt-auto pt-3">
                      <div className="flex items-center gap-1 bg-[#fafbfc] border border-[#e8ecf1] rounded-full p-1">
                        <button
                          onClick={() =>
                            handleUpdateQuantity(item.id, Math.max(1, item.quantity - 1))
                          }
                          className="w-7 h-7 inline-flex items-center justify-center rounded-full text-[#94a3b8] hover:text-[#1e293b] transition-colors"
                          aria-label="Kurang"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="text-sm font-semibold text-[#1e293b] min-w-[24px] text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                          className="w-7 h-7 inline-flex items-center justify-center rounded-full text-[#94a3b8] hover:text-[#1e293b] transition-colors"
                          aria-label="Tambah"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="flex items-center gap-3">
                        <div className="text-right">
                          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#94a3b8]">
                            Subtotal
                          </p>
                          <p className="text-sm md:text-base font-bold text-[#1e293b]">
                            {formatPrice(item.price * item.quantity)}
                          </p>
                        </div>
                        <button
                          onClick={() => handleRemoveItem(item.id)}
                          className="w-9 h-9 inline-flex items-center justify-center rounded-full border border-[#e8ecf1] text-[#94a3b8] hover:text-[#00B4E6] hover:border-[#00B4E6]/40 transition-colors"
                          aria-label="Hapus"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {/* Guarantees */}
              <div className="bg-white border border-[#e8ecf1] rounded-2xl p-5 grid grid-cols-1 sm:grid-cols-3 gap-4">
                {[
                  { icon: ShieldCheck, label: 'Produk original bergaransi' },
                  { icon: Truck, label: 'Pengiriman aman & cepat' },
                  { icon: RotateCcw, label: 'Uang kembali 100%' },
                ].map(({ icon: Icon, label }, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <span className="w-9 h-9 inline-flex items-center justify-center rounded-full bg-[#fafbfc] border border-[#e8ecf1] text-[#00B4E6] shrink-0">
                      <Icon className="w-4 h-4" />
                    </span>
                    <p className="text-xs text-[#1e293b] font-medium">{label}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white border border-[#e8ecf1] rounded-2xl p-5 md:p-6 sticky top-28 space-y-5">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#00B4E6]">
                    Ringkasan
                  </span>
                  <h3 className="font-sans text-2xl text-[#1e293b] mt-1">
                    Total Pesanan
                  </h3>
                </div>

                {/* Promo */}
                <div>
                  <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#94a3b8] mb-2 block">
                    Kode Promo
                  </label>
                  <div className="flex items-center gap-2 bg-[#fafbfc] border border-[#e8ecf1] rounded-full p-1.5 pl-4 focus-within:border-[#00B4E6] focus-within:ring-4 focus-within:ring-[#00B4E6]/10 transition-all">
                    <Ticket className="w-4 h-4 text-[#94a3b8] shrink-0" />
                    <input
                      type="text"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value.toUpperCase())}
                      placeholder="SAVE10"
                      className="flex-1 bg-transparent text-sm outline-none min-w-0 text-[#1e293b] placeholder:text-[#94a3b8]"
                    />
                    <button
                      onClick={handleApplyPromo}
                      className="bg-[#1e293b] text-white px-4 py-2 rounded-full text-xs font-semibold hover:bg-[#00B4E6] transition-colors shrink-0"
                    >
                      Terapkan
                    </button>
                  </div>
                  {promoMessage && (
                    <p
                      className={
                        'text-xs mt-2 ' +
                        (promoMessage.type === 'ok' ? 'text-[#00B4E6]' : 'text-[#94a3b8]')
                      }
                    >
                      {promoMessage.text}
                    </p>
                  )}
                </div>

                {/* Breakdown */}
                <div className="space-y-2 text-sm border-t border-[#e8ecf1] pt-4">
                  <div className="flex justify-between text-[#94a3b8]">
                    <span>Subtotal</span>
                    <span className="text-[#1e293b] font-medium">{formatPrice(subtotal)}</span>
                  </div>
                  {discount > 0 && (
                    <div className="flex justify-between text-[#94a3b8]">
                      <span>Diskon ({discount}%)</span>
                      <span className="text-[#00B4E6] font-medium">
                        −{formatPrice(discountAmount)}
                      </span>
                    </div>
                  )}
                  <div className="flex justify-between text-[#94a3b8]">
                    <span>Ongkir</span>
                    <span
                      className={
                        shippingCost === 0
                          ? 'text-[#00B4E6] font-semibold'
                          : 'text-[#1e293b] font-medium'
                      }
                    >
                      {shippingCost === 0 ? 'Gratis' : formatPrice(shippingCost)}
                    </span>
                  </div>
                </div>

                <div className="flex items-baseline justify-between pt-4 border-t border-[#e8ecf1]">
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#94a3b8]">
                    Total
                  </span>
                  <span className="font-sans text-3xl text-[#1e293b]">
                    {formatPrice(total)}
                  </span>
                </div>

                <button
                  onClick={() => {
                    if (cartItems.length === 0) return;
                    sessionStorage.setItem(
                      'aerova_checkout',
                      JSON.stringify({
                        items: cartItems,
                        subtotal,
                        discount,
                        discountAmount,
                        shippingCost,
                        total,
                      }),
                    );
                    router.push('/checkout');
                  }}
                  className="w-full inline-flex items-center justify-center gap-2 bg-[#1e293b] text-white px-6 py-3.5 rounded-full text-sm font-semibold hover:bg-[#00B4E6] transition-all active:scale-[0.98]"
                >
                  Lanjut Pembayaran
                  <ArrowRight className="w-4 h-4" />
                </button>

                <Link href="/">
                  <button className="w-full text-xs font-semibold uppercase tracking-widest text-[#94a3b8] hover:text-[#1e293b] transition-colors py-1">
                    Lanjut Belanja
                  </button>
                </Link>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-white border border-[#e8ecf1] rounded-3xl p-12 md:p-16 text-center">
            <div className="w-16 h-16 mx-auto rounded-full bg-[#fafbfc] border border-[#e8ecf1] flex items-center justify-center mb-4">
              <ShoppingBag className="w-6 h-6 text-[#94a3b8]" />
            </div>
            <h2 className="font-sans text-3xl text-[#1e293b]">Keranjang masih kosong</h2>
            <p className="text-sm text-[#94a3b8] mt-2 mb-6 max-w-sm mx-auto">
              Yuk isi keranjang Anda dengan penawaran spesial hari ini.
            </p>
            <Link href="/">
              <button className="inline-flex items-center gap-2 bg-[#1e293b] text-white px-6 py-3.5 rounded-full text-sm font-semibold hover:bg-[#00B4E6] transition-colors">
                Mulai Belanja
                <ArrowRight className="w-4 h-4" />
              </button>
            </Link>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}

export const Route = createFileRoute('/cart')({ component: CartPage });
