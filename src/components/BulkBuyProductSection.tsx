

import { useState } from 'react';
import { ShoppingCart, Heart } from 'lucide-react';
import { Product } from '@/lib/products';

interface BulkBuyProductSectionProps {
  products: Product[];
  onAddToCart: (product: Product) => void;
}

export default function BulkBuyProductSection({
  products,
  onAddToCart,
}: BulkBuyProductSectionProps) {
  const [sortBy, setSortBy] = useState('default');
  const [favorites, setFavorites] = useState<string[]>([]);

  const formatPrice = (price: number) => {
    return `Rp ${price.toLocaleString('id-ID')}`;
  };

  const toggleFavorite = (productId: string) => {
    setFavorites((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    );
  };

  // Sort products
  const getSortedProducts = () => {
    const sorted = [...products];

    switch (sortBy) {
      case 'price-low':
        return sorted.sort((a, b) => a.price - b.price);
      case 'price-high':
        return sorted.sort((a, b) => b.price - a.price);
      case 'newest':
        return sorted.reverse();
      case 'best-seller':
        return sorted.sort((a, b) => (b.discount || 0) - (a.discount || 0));
      default:
        return sorted;
    }
  };

  const sortedProducts = getSortedProducts();

  return (
    <div className="mb-12">
      {/* Header with Sort */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Beli Banyak Lebih Murah</h2>
          <p className="text-sm text-gray-600">
            Dapatkan harga spesial untuk pembelian dalam jumlah banyak. Pilihan terbaik untuk Anda yang ingin hemat!
          </p>
        </div>

        {/* Sort Dropdown */}
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg text-sm outline-none hover:border-blue-600 focus:border-blue-600 focus:ring-1 focus:ring-blue-600 bg-white text-gray-700 font-medium"
        >
          <option value="default">Default</option>
          <option value="price-low">Harga Terendah</option>
          <option value="price-high">Harga Tertinggi</option>
          <option value="newest">Terbaru</option>
          <option value="best-seller">Terlaris</option>
        </select>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {sortedProducts.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow group cursor-pointer"
          >
            {/* Image Container */}
            <div className="relative h-40 bg-gray-100 overflow-hidden">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform"
              />

              {/* Discount Badge */}
              {product.discount && (
                <div className="absolute top-2 right-2 bg-red-600 text-white px-2 py-1 rounded text-xs font-bold">
                  {product.discount}% OFF
                </div>
              )}

              {/* Favorite Button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleFavorite(product.id);
                }}
                className="absolute bottom-2 right-2 bg-white rounded-full p-1.5 shadow-md hover:bg-gray-100 transition-colors"
              >
                <Heart
                  className="w-4 h-4"
                  fill={favorites.includes(product.id) ? '#ef4444' : 'none'}
                  color={favorites.includes(product.id) ? '#ef4444' : '#999'}
                />
              </button>
            </div>

            {/* Content */}
            <div className="p-3">
              {/* Product Name */}
              <h3 className="text-sm font-medium text-gray-800 line-clamp-2 mb-2 h-10">
                {product.name}
              </h3>

              {/* Price */}
              <div className="mb-3">
                <div className="flex items-baseline gap-2">
                  <span className="text-lg font-bold text-blue-600">
                    {formatPrice(product.price)}
                  </span>
                  {product.originalPrice && (
                    <span className="text-xs text-gray-400 line-through">
                      {formatPrice(product.originalPrice)}
                    </span>
                  )}
                </div>
              </div>

              {/* Buttons */}
              <div className="flex flex-col gap-2">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onAddToCart(product);
                  }}
                  className="w-full border border-blue-600 text-blue-600 px-2 py-2 rounded text-xs font-medium hover:bg-blue-50 transition-colors"
                >
                  + Keranjang
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onAddToCart(product);
                  }}
                  className="w-full bg-blue-600 text-white px-2 py-2 rounded text-xs font-medium hover:bg-blue-700 transition-colors flex items-center justify-center gap-1"
                >
                  <ShoppingCart className="w-3 h-3" />
                  Beli Sekarang
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
