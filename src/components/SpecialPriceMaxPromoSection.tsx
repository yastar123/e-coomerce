

import { Product } from '@/lib/products';
import { ShoppingCart, Heart } from 'lucide-react';
import { Image } from '@/lib/next-shims';

interface SpecialPriceMaxPromoSectionProps {
  products: Product[];
  onAddToCart: (product: Product, quantity: number) => void;
}

export default function SpecialPriceMaxPromoSection({
  products,
  onAddToCart,
}: SpecialPriceMaxPromoSectionProps) {
  return (
    <section className="mb-12">
      {/* Section Title */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Harga Spesial Untung Maksimal</h2>
      </div>

      {/* Main Container with Promo Banner and Products */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Promo Banner - Left Side */}
        <div className="lg:col-span-1">
          <div className="bg-gradient-to-br from-orange-400 to-orange-600 rounded-lg overflow-hidden shadow-md h-full flex flex-col justify-between p-6 text-white">
            {/* Logo/Header */}
            <div>
              <div className="text-2xl font-bold mb-2">LOTTE</div>
              <div className="text-3xl font-black mb-4">UNTUNG<br />MAKSIMAL</div>
            </div>

            {/* Promo Details */}
            <div className="text-sm space-y-2">
              <p className="font-semibold">Belanja Produk Pilihan</p>
              <p className="text-xs opacity-90">Dapatkan diskon spesial hingga 50% untuk produk-produk pilihan. Stok terbatas, buruan pesan!</p>
              <div className="pt-2 border-t border-white border-opacity-30">
                <p className="text-xs font-bold">Periode Promo:</p>
                <p className="text-xs">Hingga stok terbatas</p>
              </div>
            </div>
          </div>
        </div>

        {/* Products Grid - 4 Columns */}
        <div className="lg:col-span-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {products.slice(0, 8).map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow"
            >
              {/* Product Image */}
              <div className="relative h-40 bg-gray-100 overflow-hidden group">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                {product.discount && (
                  <div className="absolute top-2 right-2 bg-red-600 text-white px-2 py-1 rounded text-xs font-semibold">
                    {product.discount}% OFF
                  </div>
                )}
                <button
                  className="absolute top-2 left-2 bg-white rounded-full p-1.5 shadow opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={() => {}}
                >
                  <Heart size={16} className="text-gray-600" />
                </button>
              </div>

              {/* Product Info */}
              <div className="p-3">
                {/* Product Name */}
                <h3 className="text-xs font-semibold text-gray-900 mb-1.5 line-clamp-2">
                  {product.name}
                </h3>

                {/* Price */}
                <div className="flex flex-col gap-1 mb-2">
                  <span className="text-sm font-bold text-red-600">
                    Rp {product.price.toLocaleString('id-ID')}
                  </span>
                  {product.originalPrice && (
                    <span className="text-xs text-gray-500 line-through">
                      Rp {product.originalPrice.toLocaleString('id-ID')}
                    </span>
                  )}
                </div>

                {/* Stock Status */}
                <p className="text-xs text-red-600 font-semibold mb-2">Stok {product.inStock ? 'Tersedia' : 'Habis'}</p>

                {/* Add to Cart Button */}
                <button
                  onClick={() => onAddToCart(product, 1)}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-1.5 rounded text-xs font-semibold transition-colors flex items-center justify-center gap-1"
                >
                  <ShoppingCart size={14} />
                  + Keranjang
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
