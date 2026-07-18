import { useState, useMemo } from 'react';
import { Link } from '@/lib/next-shims';
import { products, type Product } from '@/lib/products';
import ProductCard from '@/components/ProductCard';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { ChevronLeft, SlidersHorizontal } from 'lucide-react';
import { useCart, addToCart } from '@/lib/cart-store';


interface CategoryPageClientProps {
  slug: string;
}

const formatPrice = (n: number) => `Rp ${n.toLocaleString('id-ID')}`;

export default function CategoryPageClient({ slug }: CategoryPageClientProps) {
  const [sortBy, setSortBy] = useState('newest');
  const [priceRange, setPriceRange] = useState([0, 100000]);
  const [showFilters, setShowFilters] = useState(false);

  const getCategoryFromSlug = (slug: string) => {
    const map: { [key: string]: string } = {
      'cup-220ml': 'Cup 220ml',
      'botol-600ml': 'Botol 600ml',
      'dus-and-karton': 'Dus / Karton',
    };
    return map[slug] || 'All';
  };

  const categoryName = getCategoryFromSlug(slug);
  const categoryProducts = products.filter((p) => p.category === categoryName);
  const filteredByPrice = categoryProducts.filter(
    (p) => p.price >= priceRange[0] && p.price <= priceRange[1]
  );

  const sortedProducts = useMemo(() => {
    const sorted = [...filteredByPrice];
    switch (sortBy) {
      case 'price-low':
        return sorted.sort((a, b) => a.price - b.price);
      case 'price-high':
        return sorted.sort((a, b) => b.price - a.price);
      case 'discount':
        return sorted.sort((a, b) => (b.discount || 0) - (a.discount || 0));
      default:
        return sorted;
    }
  }, [filteredByPrice, sortBy]);

  const cartItems = useCart();
  const handleAddToCart = (product: Product) => addToCart(product, 1);

  return (
    <div className="min-h-screen bg-[#fafbfc] text-[#1e293b] flex flex-col">
      <Header cartCount={cartItems.length} onCartClick={() => {}} />


      <main className="flex-1 max-w-7xl w-full mx-auto px-4 md:px-6 py-8 md:py-10">
        {/* Back */}
        <Link
          href="/categories"
          className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-[#94a3b8] hover:text-[#1e293b] mb-6 transition-colors"
        >
          <ChevronLeft className="w-3.5 h-3.5" />
          Semua Kategori
        </Link>

        {/* Header */}
        <div className="mb-8 md:mb-10 flex items-end justify-between flex-wrap gap-4">
          <div>
            <span className="inline-block text-[10px] font-bold uppercase tracking-[0.2em] text-[#00B4E6]">
              Kategori
            </span>
            <h1 className="font-sans text-4xl md:text-5xl text-[#1e293b] leading-tight mt-2">
              {categoryName}.
            </h1>
            <p className="text-sm text-[#94a3b8] mt-2">
              {sortedProducts.length} produk tersedia.
            </p>
          </div>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="hidden lg:block shrink-0 px-4 py-2 border border-[#e8ecf1] rounded-full text-xs font-semibold bg-white text-[#1e293b] outline-none focus:border-[#00B4E6] cursor-pointer"
          >
            <option value="newest">Terbaru</option>
            <option value="price-low">Harga Terendah</option>
            <option value="price-high">Harga Tertinggi</option>
            <option value="discount">Diskon Terbesar</option>
          </select>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar filter */}
          <aside className="hidden lg:block">
            <div className="bg-white border border-[#e8ecf1] rounded-2xl p-6 sticky top-28 space-y-6">
              <div className="flex items-center gap-2">
                <SlidersHorizontal className="w-4 h-4 text-[#00B4E6]" />
                <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#00B4E6]">
                  Filter
                </h3>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#1e293b] mb-3">
                  Rentang Harga
                </label>
                <div className="space-y-4">
                  <div>
                    <p className="text-xs text-[#94a3b8] mb-1.5">
                      Min: <span className="text-[#1e293b] font-medium">{formatPrice(priceRange[0])}</span>
                    </p>
                    <input
                      type="range"
                      min="0"
                      max="100000"
                      value={priceRange[0]}
                      onChange={(e) =>
                        setPriceRange([Number(e.target.value), priceRange[1]])
                      }
                      className="w-full accent-[#00B4E6]"
                    />
                  </div>
                  <div>
                    <p className="text-xs text-[#94a3b8] mb-1.5">
                      Max: <span className="text-[#1e293b] font-medium">{formatPrice(priceRange[1])}</span>
                    </p>
                    <input
                      type="range"
                      min="0"
                      max="100000"
                      value={priceRange[1]}
                      onChange={(e) =>
                        setPriceRange([priceRange[0], Number(e.target.value)])
                      }
                      className="w-full accent-[#00B4E6]"
                    />
                  </div>
                </div>
              </div>

              <button
                onClick={() => {
                  setSortBy('newest');
                  setPriceRange([0, 100000]);
                }}
                className="w-full px-4 py-2.5 text-xs font-semibold uppercase tracking-widest text-[#94a3b8] border border-[#e8ecf1] rounded-full hover:text-[#1e293b] hover:border-[#1e293b]/30 transition-colors"
              >
                Reset Filter
              </button>
            </div>
          </aside>

          {/* Products */}
          <div className="lg:col-span-3">
            {/* Mobile controls */}
            <div className="lg:hidden mb-5 flex gap-2">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-white border border-[#e8ecf1] rounded-full text-xs font-semibold uppercase tracking-widest text-[#1e293b] hover:border-[#00B4E6]/40 transition-colors"
              >
                <SlidersHorizontal className="w-3.5 h-3.5" />
                Filter
              </button>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="flex-1 px-4 py-2.5 border border-[#e8ecf1] rounded-full text-xs font-semibold bg-white text-[#1e293b] outline-none focus:border-[#00B4E6] cursor-pointer"
              >
                <option value="newest">Terbaru</option>
                <option value="price-low">Harga Terendah</option>
                <option value="price-high">Harga Tertinggi</option>
                <option value="discount">Diskon Terbesar</option>
              </select>
            </div>

            {showFilters && (
              <div className="lg:hidden mb-5 bg-white border border-[#e8ecf1] rounded-2xl p-5 space-y-3">
                <label className="block text-xs font-semibold text-[#1e293b]">Rentang Harga</label>
                <input
                  type="range"
                  min="0"
                  max="100000"
                  value={priceRange[0]}
                  onChange={(e) =>
                    setPriceRange([Number(e.target.value), priceRange[1]])
                  }
                  className="w-full accent-[#00B4E6]"
                />
                <input
                  type="range"
                  min="0"
                  max="100000"
                  value={priceRange[1]}
                  onChange={(e) =>
                    setPriceRange([priceRange[0], Number(e.target.value)])
                  }
                  className="w-full accent-[#00B4E6]"
                />
                <p className="text-xs text-[#94a3b8] text-center">
                  {formatPrice(priceRange[0])} — {formatPrice(priceRange[1])}
                </p>
              </div>
            )}

            {sortedProducts.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5">
                {sortedProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onAddToCart={handleAddToCart}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-16 bg-white border border-[#e8ecf1] rounded-3xl">
                <p className="font-sans text-2xl text-[#1e293b]">Belum ada produk</p>
                <p className="text-sm text-[#94a3b8] mt-2">
                  Tidak ada produk yang cocok dengan filter Anda.
                </p>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
