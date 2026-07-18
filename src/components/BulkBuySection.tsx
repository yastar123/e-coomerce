

import { useState } from 'react';
import { ShoppingBag } from 'lucide-react';
import { Product } from '@/lib/products';

interface BulkBuySectionProps {
  onAddToCart: (product: Product, quantity?: number) => void;
  onProductClick?: (product: Product) => void;
}

const BULK_PRODUCTS: Product[] = [
  {
    id: 'bulk-1',
    name: 'Minyak Goreng Premium 18L',
    price: 385000,
    category: 'Cooking Oil',
    discount: 15,
    image: 'https://images.unsplash.com/photo-1585518419759-ecd46fa17028?w=300&h=300&fit=crop',
    inStock: true
  },
  {
    id: 'bulk-2',
    name: 'Tepung Terigu Berkualitas 25kg',
    price: 425000,
    category: 'Flour',
    discount: 12,
    image: 'https://images.unsplash.com/photo-1585707572336-c2e1e9e6f1c0?w=300&h=300&fit=crop',
    inStock: true
  },
  {
    id: 'bulk-3',
    name: 'Gula Pasir Putih 50kg',
    price: 650000,
    category: 'Sugar',
    discount: 18,
    image: 'https://images.unsplash.com/photo-1599599810694-b5ac4dd64e8b?w=300&h=300&fit=crop',
    inStock: true
  },
  {
    id: 'bulk-4',
    name: 'Beras Premium Lokal 50kg',
    price: 750000,
    category: 'Rice',
    discount: 10,
    image: 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=300&h=300&fit=crop',
    inStock: true
  },
  {
    id: 'bulk-5',
    name: 'Susu Bubuk Instan 20kg',
    price: 1250000,
    category: 'Milk Powder',
    discount: 20,
    image: 'https://images.unsplash.com/photo-1585518419759-ecd46fa17028?w=300&h=300&fit=crop',
    inStock: true
  },
  {
    id: 'bulk-6',
    name: 'Mentega Putih 10kg',
    price: 580000,
    category: 'Butter',
    discount: 14,
    image: 'https://images.unsplash.com/photo-1599599810694-b5ac4dd64e8b?w=300&h=300&fit=crop',
    inStock: true
  },
  {
    id: 'bulk-7',
    name: 'Telur Ayam Segar Kotak 30 butir',
    price: 125000,
    category: 'Eggs',
    discount: 8,
    image: 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=300&h=300&fit=crop',
    inStock: true
  },
  {
    id: 'bulk-8',
    name: 'Kopi Bubuk Premium 5kg',
    price: 425000,
    category: 'Coffee',
    discount: 16,
    image: 'https://images.unsplash.com/photo-1585518419759-ecd46fa17028?w=300&h=300&fit=crop',
    inStock: true
  },
  {
    id: 'bulk-9',
    name: 'Teh Hitam Celup 500 Kantong',
    price: 275000,
    category: 'Tea',
    discount: 11,
    image: 'https://images.unsplash.com/photo-1599599810694-b5ac4dd64e8b?w=300&h=300&fit=crop',
    inStock: true
  },
  {
    id: 'bulk-10',
    name: 'Garam Halus Iodium 25kg',
    price: 185000,
    category: 'Salt',
    discount: 9,
    image: 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=300&h=300&fit=crop',
    inStock: true
  }
];

export default function BulkBuySection({
  onAddToCart,
  onProductClick = () => {}
}: BulkBuySectionProps) {
  const [sortBy, setSortBy] = useState('default');

  const getSortedProducts = () => {
    const sorted = [...BULK_PRODUCTS];

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
    <div className="mb-12 bg-white rounded-lg shadow-sm p-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Beli Banyak Lebih Murah
          </h2>
          <p className="text-gray-600 text-sm">
            Dapatkan harga spesial untuk pembelian dalam jumlah banyak. Pilihan terbaik untuk Anda yang ingin hemat!
          </p>
        </div>

        {/* Sort Dropdown */}
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg text-sm text-gray-700 outline-none hover:border-blue-600 focus:border-blue-600 transition-colors whitespace-nowrap"
        >
          <option value="default">Default</option>
          <option value="price-low">Harga Terendah</option>
          <option value="price-high">Harga Tertinggi</option>
          <option value="newest">Terbaru</option>
          <option value="best-seller">Terlaris</option>
        </select>
      </div>

      {/* Promo Banner */}
      <div className="bg-gradient-to-r from-blue-50 to-blue-100 border border-blue-200 rounded-lg p-4 mb-6 flex items-start gap-3">
        <ShoppingBag className="text-blue-600 flex-shrink-0 mt-1" size={20} />
        <div>
          <h3 className="font-bold text-blue-900 text-sm mb-1">
            Beli Banyak Lebih Murah
          </h3>
          <p className="text-blue-800 text-xs">
            Hemat hingga 50% dengan pembelian dalam jumlah besar. Gratis ongkir untuk pembelian minimal!
          </p>
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        {sortedProducts.map((product) => (
          <div
            key={product.id}
            className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg hover:border-blue-300 transition-all duration-200 cursor-pointer group"
            onClick={() => onProductClick(product)}
          >
            {/* Image Container */}
            <div className="relative w-full aspect-square bg-gray-100 overflow-hidden">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              {product.discount && (
                <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded text-xs font-bold">
                  -{product.discount}%
                </div>
              )}
            </div>

            {/* Product Info */}
            <div className="p-3">
              {/* Product Name */}
              <h3 className="text-sm font-medium text-gray-800 mb-2 line-clamp-2 h-10">
                {product.name}
              </h3>

              {/* Price */}
              <div className="mb-3">
                <p className="text-lg font-bold text-gray-900">
                  Rp {Math.floor(product.price * (1 - (product.discount || 0) / 100)).toLocaleString('id-ID')}
                </p>
                {product.discount && (
                  <p className="text-xs text-gray-400 line-through">
                    Rp {product.price.toLocaleString('id-ID')}
                  </p>
                )}
              </div>

              {/* Buttons */}
              <div className="space-y-2">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onAddToCart(product);
                  }}
                  className="w-full px-3 py-1.5 border border-blue-600 text-blue-600 text-sm font-medium rounded hover:bg-blue-50 transition-colors"
                >
                  + Keranjang
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onAddToCart(product);
                  }}
                  className="w-full px-3 py-1.5 bg-blue-600 text-white text-sm font-medium rounded hover:bg-blue-700 transition-colors"
                >
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
