import { createFileRoute } from '@tanstack/react-router';
import { useState } from 'react';
import Header from '@/components/Header';
import HeroBanner from '@/components/HeroBanner';
import SpecialPriceHeader from '@/components/SpecialPriceHeader';
import SpecialPriceGrid from '@/components/SpecialPriceGrid';
import Cart from '@/components/Cart';
import Footer from '@/components/Footer';
import CategoryBrowseSection from '@/components/CategoryBrowseSection';
import BestSellerSection from '@/components/BestSellerSection';
import FAQSection from '@/components/FAQSection';
import { products, browseCategories, Product } from '@/lib/products';
import { useCart, addToCart, updateQuantity, removeFromCart } from '@/lib/cart-store';

function Page() {
  const cartItems = useCart();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [sortBy, setSortBy] = useState('default');


  // FAQ data khusus brand AEROVA
  const [faqs] = useState([
    {
      id: '1',
      question: 'Apa perbedaan Aerova dengan merek air minum lainnya?',
      answer: 'Aerova adalah air minum dalam kemasan (AMDK) yang mengutamakan kemurnian alami, proses filtrasi berteknologi, dan keseimbangan mineral terbaik untuk hidrasi harian Anda. Setiap tetes Aerova melewati pengawasan kualitas ketat agar aman dan segar dikonsumsi keluarga.',
      category: 'Produk'
    },
    {
      id: '2',
      question: 'Berapa lama pengiriman pesanan Aerova?',
      answer: 'Untuk wilayah Jabodetabek, pesanan biasanya sampai dalam 1–2 hari kerja. Untuk wilayah luar Jabodetabek, estimasi pengiriman 2–5 hari kerja tergantung lokasi. Anda akan mendapatkan notifikasi status pengiriman setelah pesanan dikirim.',
      category: 'Pengiriman'
    },
    {
      id: '3',
      question: 'Apakah tersedia layanan langganan rutin (subscription)?',
      answer: 'Ya, Aerova menyediakan program langganan mingguan atau bulanan untuk rumah tangga, kantor, dan bisnis Anda. Dengan berlangganan, Anda bisa menikmati harga spesial, pengiriman terjadwal, dan gratis ongkir untuk wilayah tertentu.',
      category: 'Layanan'
    },
    {
      id: '4',
      question: 'Bagaimana jika galon atau kemasan yang diterima rusak?',
      answer: 'Jika produk Aerova yang Anda terima rusak, bocor, atau tidak sesuai pesanan, silakan hubungi Customer Service kami di WhatsApp 0811-7912-233 dalam waktu 24 jam sejak penerimaan. Kami akan membantu proses penggantian atau pengembalian dana.',
      category: 'Pengembalian'
    },
    {
      id: '5',
      question: 'Metode pembayaran apa saja yang diterima Aerova?',
      answer: 'Aerova menerima pembayaran melalui transfer bank, kartu kredit/debit, e-wallet (GoPay, OVO, DANA, LinkAja), serta pembayaran tunai saat pengantaran (COD) untuk wilayah tertentu. Semua transaksi diverifikasi secara otomatis.',
      category: 'Pembayaran'
    },
    {
      id: '6',
      question: 'Apakah ada biaya pengiriman untuk pesanan Aerova?',
      answer: 'Biaya pengiriman dihitung berdasarkan lokasi dan berat total pesanan. Aerova menyediakan promo gratis ongkir untuk pembelian tertentu dan wilayah yang sudah ditentukan. Detail ongkir akan muncul sebelum Anda menyelesaikan checkout.',
      category: 'Pembayaran'
    },
    {
      id: '7',
      question: 'Bagaimana cara menggunakan kode voucher Aerova?',
      answer: 'Masukkan kode voucher Aerova pada kolom "Kode Voucher" saat checkout. Diskon atau benefit akan langsung diterapkan ke total belanja. Pastikan voucher masih berlaku dan memenuhi syarat minimum pembelian yang berlaku.',
      category: 'Promosi'
    },
    {
      id: '8',
      question: 'Apakah saya bisa membatalkan atau ubah pesanan Aerova?',
      answer: 'Anda dapat membatalkan atau mengubah pesanan dalam waktu 1 jam setelah pembayaran, selama pesanan belum diproses untuk pengiriman. Setelah pesanan masuk ke kurir, silakan hubungi Customer Service untuk bantuan lebih lanjut.',
      category: 'Pemesanan'
    }
  ]);

  const handleAddToCart = (product: Product, quantity: number = 1) => {
    addToCart(product, quantity);
  };

  const handleUpdateQuantity = (id: string, quantity: number) => {
    updateQuantity(id, quantity);
  };

  const handleRemoveItem = (id: string) => {
    removeFromCart(id);
  };


  const sortedSpecial = [...products].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'best-seller':
        return (b.discount || 0) - (a.discount || 0);
      case 'newest':
        return 0;
      default:
        return 0;
    }
  });

  return (
    <div className="min-h-screen bg-[#fafbfc] text-[#1e293b]">
      <Header cartCount={cartItems.length} onCartClick={() => setIsCartOpen(true)} />

      <main className="max-w-7xl mx-auto px-4 md:px-6 py-8 md:py-10 space-y-16">
        <HeroBanner />

        <section>
          <SpecialPriceHeader sortBy={sortBy} onSortChange={setSortBy} />
          <SpecialPriceGrid products={sortedSpecial} onAddToCart={handleAddToCart} />
        </section>

        <section>
          <div className="mb-6">
            <h2 className="font-sans text-3xl md:text-4xl text-[#1e293b] leading-tight">
              Jelajahi Kategori
            </h2>
            <p className="text-sm text-[#94a3b8] mt-1">
              Temukan kebutuhan toko Anda dari kategori pilihan.
            </p>
          </div>
          <CategoryBrowseSection categories={browseCategories} />
        </section>

        <section>
          <div className="mb-6">
            <h2 className="font-sans text-3xl md:text-4xl text-[#1e293b] leading-tight">
              Paling Dicari
            </h2>
            <p className="text-sm text-[#94a3b8] mt-1">
              Produk favorit pelanggan minggu ini.
            </p>
          </div>
          <BestSellerSection
            products={products}
            onAddToCart={handleAddToCart}
          />
        </section>

        <section>
          <div className="mb-6">
            <h2 className="font-sans text-3xl md:text-4xl text-foreground leading-tight">
              Pertanyaan Umum
            </h2>
            <p className="text-sm text-muted-foreground mt-1">
              Temukan jawaban seputar produk, pengiriman, dan layanan Aerova.
            </p>
          </div>
          <FAQSection faqs={faqs} />
        </section>
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


export const Route = createFileRoute('/')({ component: Page });
