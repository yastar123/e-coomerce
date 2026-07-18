import { createFileRoute } from '@tanstack/react-router';
import { useState } from 'react';
import { useParams, useRouter, Link } from '@/lib/next-shims';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Cart from '@/components/Cart';
import ProductCard from '@/components/ProductCard';
import { products, Product } from '@/lib/products';
import { ShoppingCart, Heart, ArrowLeft, Share2, Plus, Minus, ShieldCheck, Truck, Star } from 'lucide-react';
import { useCart, addToCart, updateQuantity, removeFromCart } from '@/lib/cart-store';

const formatPrice = (n: number) => `Rp ${n.toLocaleString('id-ID')}`;


function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const productId = params.id as string;

  const product = products.find((p) => p.id === productId);
  const [quantity, setQuantity] = useState(1);
  const cartItems = useCart();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);


  if (!product) {
    return (
      <div className="min-h-screen bg-[#fafbfc] text-[#1e293b]">
        <Header cartCount={cartItems.length} onCartClick={() => setIsCartOpen(true)} />
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-24 text-center">
          <h1 className="font-sans text-4xl text-[#1e293b] mb-3">
            Produk tidak ditemukan
          </h1>
          <p className="text-sm text-[#94a3b8] mb-6">
            Produk yang Anda cari sudah tidak tersedia.
          </p>
          <Link href="/">
            <button className="inline-flex items-center gap-2 bg-[#1e293b] text-white px-6 py-3 rounded-full text-sm font-semibold hover:bg-[#00B4E6] transition-colors">
              Kembali ke Beranda
            </button>
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const handleAddToCart = (prod: Product, qty: number = quantity) => {
    addToCart(prod, qty);
    setQuantity(1);
  };

  const handleUpdateQuantity = (id: string, qty: number) => {
    updateQuantity(id, qty);
  };

  const handleRemoveItem = (id: string) => {
    removeFromCart(id);
  };


  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 5);

  return (
    <div className="min-h-screen bg-[#fafbfc] text-[#1e293b]">
      <Header cartCount={cartItems.length} onCartClick={() => setIsCartOpen(true)} />

      <main className="max-w-7xl mx-auto px-4 md:px-6 py-8 md:py-10 space-y-14">
        {/* Back */}
        <button
          onClick={() => router.back()}
          className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-[#94a3b8] hover:text-[#1e293b] transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          Kembali
        </button>

        {/* Detail */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 md:gap-8">
          {/* Image */}
          <div className="lg:col-span-2">
            <div className="bg-white border border-[#e8ecf1] rounded-3xl p-4 md:p-6 sticky top-28 space-y-4">
              <div className="relative aspect-square bg-[#fafbfc] rounded-2xl overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
                {product.discount ? (
                  <span className="absolute top-3 left-3 bg-white/95 backdrop-blur text-[#00B4E6] text-[10px] font-bold px-2.5 py-1 rounded-full border border-[#e8ecf1]">
                    −{product.discount}%
                  </span>
                ) : null}
              </div>
              <div className="grid grid-cols-4 gap-2">
                {[0, 1, 2, 3].map((i) => (
                  <button
                    key={i}
                    className={
                      'aspect-square rounded-xl overflow-hidden border transition-all ' +
                      (i === 0
                        ? 'border-[#00B4E6]'
                        : 'border-[#e8ecf1] hover:border-[#00B4E6]/40')
                    }
                  >
                    <img src={product.image} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Info */}
          <div className="lg:col-span-3 space-y-6">
            <div className="bg-white border border-[#e8ecf1] rounded-3xl p-6 md:p-8 space-y-6">
              <div className="flex items-start justify-between gap-4">
                <div className="space-y-2 min-w-0">
                  <span className="inline-block text-[10px] font-bold uppercase tracking-[0.2em] text-[#00B4E6]">
                    {product.category}
                  </span>
                  <h1 className="font-sans text-3xl md:text-4xl text-[#1e293b] leading-tight">
                    {product.name}
                  </h1>
                </div>
                <div className="flex gap-2 shrink-0">
                  <button
                    onClick={() => setIsFavorite(!isFavorite)}
                    className="w-10 h-10 inline-flex items-center justify-center rounded-full border border-[#e8ecf1] text-[#94a3b8] hover:text-[#00B4E6] hover:border-[#00B4E6]/40 transition-colors"
                    aria-label="Favorit"
                  >
                    <Heart
                      className="w-4 h-4"
                      fill={isFavorite ? '#00B4E6' : 'none'}
                      color={isFavorite ? '#00B4E6' : 'currentColor'}
                    />
                  </button>
                  <button className="w-10 h-10 inline-flex items-center justify-center rounded-full border border-[#e8ecf1] text-[#94a3b8] hover:text-[#1e293b] transition-colors">
                    <Share2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Rating */}
              <div className="flex items-center gap-3 text-xs text-[#94a3b8]">
                <div className="flex items-center gap-0.5 text-[#00B4E6]">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5" fill="#00B4E6" />
                  ))}
                </div>
                <span className="text-[#1e293b] font-semibold">4.9</span>
                <span>· 234 ulasan</span>
                <span>· Terjual 1.2K</span>
              </div>

              {/* Price */}
              <div className="border-t border-[#e8ecf1] pt-6">
                <div className="flex items-baseline gap-3 flex-wrap">
                  <span className="font-sans text-4xl md:text-5xl text-[#1e293b]">
                    {formatPrice(product.price)}
                  </span>
                  {product.originalPrice && (
                    <span className="text-sm text-[#94a3b8] line-through">
                      {formatPrice(product.originalPrice)}
                    </span>
                  )}
                </div>
                {product.originalPrice && (
                  <p className="text-xs font-semibold uppercase tracking-widest text-[#00B4E6] mt-2">
                    Hemat {formatPrice(product.originalPrice - product.price)}
                  </p>
                )}
              </div>

              {/* Quantity + Actions */}
              <div className="space-y-4 border-t border-[#e8ecf1] pt-6">
                <div className="flex items-center gap-4">
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#94a3b8]">
                    Jumlah
                  </span>
                  <div className="flex items-center gap-1 bg-[#fafbfc] border border-[#e8ecf1] rounded-full p-1">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-8 h-8 inline-flex items-center justify-center rounded-full text-[#94a3b8] hover:text-[#1e293b] transition-colors"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="text-sm font-semibold text-[#1e293b] min-w-[32px] text-center">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="w-8 h-8 inline-flex items-center justify-center rounded-full text-[#94a3b8] hover:text-[#1e293b] transition-colors"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  {product.inStock && (
                    <span className="text-xs text-[#94a3b8]">108 unit tersedia</span>
                  )}
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={() => handleAddToCart(product)}
                    disabled={!product.inStock}
                    className="flex-1 inline-flex items-center justify-center gap-2 bg-white border border-[#e8ecf1] text-[#1e293b] px-6 py-3.5 rounded-full text-sm font-semibold hover:bg-[#fafbfc] hover:border-[#1e293b]/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <ShoppingCart className="w-4 h-4" />
                    Tambah ke Keranjang
                  </button>
                  <button
                    disabled={!product.inStock}
                    className="flex-1 inline-flex items-center justify-center gap-2 bg-[#1e293b] text-white px-6 py-3.5 rounded-full text-sm font-semibold hover:bg-[#00B4E6] transition-all active:scale-[0.98] disabled:opacity-50"
                  >
                    Beli Sekarang
                  </button>
                </div>
              </div>

              {/* Perks */}
              <div className="grid grid-cols-2 gap-3 border-t border-[#e8ecf1] pt-6">
                {[
                  { icon: Truck, label: 'Kirim 1–2 hari' },
                  { icon: ShieldCheck, label: 'Original bergaransi' },
                ].map(({ icon: Icon, label }, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-2.5 text-xs text-[#1e293b] font-medium"
                  >
                    <span className="w-8 h-8 inline-flex items-center justify-center rounded-full bg-[#fafbfc] border border-[#e8ecf1] text-[#00B4E6]">
                      <Icon className="w-3.5 h-3.5" />
                    </span>
                    {label}
                  </div>
                ))}
              </div>
            </div>

            {/* Description */}
            <div className="bg-white border border-[#e8ecf1] rounded-3xl p-6 md:p-8">
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#00B4E6]">
                Detail
              </span>
              <h2 className="font-sans text-2xl md:text-3xl text-[#1e293b] mt-2 mb-4">
                Deskripsi Produk
              </h2>
              <p className="text-sm md:text-base text-[#94a3b8] leading-relaxed mb-4">
                {product.description}
              </p>
              <ul className="space-y-2 text-sm text-[#1e293b]">
                {[
                  'Membersihkan secara efektif sisa makanan membandel dan lemak.',
                  'Membunuh bakteri penyebab penyakit untuk perlindungan ekstra.',
                  'Aroma lemon segar yang alami dan tahan lama.',
                  'Formula aman untuk kulit dan lingkungan.',
                ].map((line, i) => (
                  <li key={i} className="flex gap-2">
                    <span className="text-[#00B4E6]">•</span>
                    <span className="text-[#94a3b8]">{line}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Specs */}
            <div className="bg-white border border-[#e8ecf1] rounded-3xl p-6 md:p-8">
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#00B4E6]">
                Spesifikasi
              </span>
              <h2 className="font-sans text-2xl md:text-3xl text-[#1e293b] mt-2 mb-5">
                Informasi Produk
              </h2>
              <div className="divide-y divide-[#e8ecf1]">
                {[
                  ['Kategori', product.category],
                  ['Min. Pembelian', '1 Unit'],
                  ['Max. Pembelian', '999.999 Unit'],
                  ['Stok', product.inStock ? '108 unit' : 'Habis'],
                  ['Pengiriman Dari', 'Jakarta Selatan'],
                ].map(([k, v]) => (
                  <div key={k} className="flex justify-between py-3 text-sm">
                    <span className="text-[#94a3b8]">{k}</span>
                    <span className="text-[#1e293b] font-medium text-right">{v}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Related */}
        {relatedProducts.length > 0 && (
          <section>
            <div className="mb-6">
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#00B4E6]">
                Anda mungkin suka
              </span>
              <h2 className="font-sans text-3xl md:text-4xl text-[#1e293b] mt-1">
                Produk Terkait
              </h2>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-5">
              {relatedProducts.map((prod) => (
                <ProductCard
                  key={prod.id}
                  product={prod}
                  onAddToCart={(p) => handleAddToCart(p, 1)}
                />
              ))}
            </div>
          </section>
        )}
      </main>

      <Footer />

      <Cart
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
      />
    </div>
  );
}

export const Route = createFileRoute('/products/$id')({ component: ProductDetailPage });
