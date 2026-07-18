

import { Product } from '@/lib/products';
import { X, Plus, Minus, ShoppingCart, Heart } from 'lucide-react';
import { useState } from 'react';

interface ProductDetailProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (product: Product, quantity: number) => void;
}

export default function ProductDetail({
  product,
  isOpen,
  onClose,
  onAddToCart
}: ProductDetailProps) {
  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);

  if (!product || !isOpen) return null;

  const formatPrice = (price: number) => {
    return `Rp ${price.toLocaleString('id-ID')}`;
  };

  const handleAddToCart = () => {
    onAddToCart(product, quantity);
    setQuantity(1);
    onClose();
  };

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-40"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto z-50 mx-4">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b sticky top-0 bg-white">
          <h2 className="text-lg font-bold">Detail Produk</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="grid md:grid-cols-2 gap-6">
            {/* Image */}
            <div className="flex flex-col items-center">
              <div className="relative w-full aspect-square bg-gray-100 rounded-lg overflow-hidden mb-4">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
                {product.discount && (
                  <div className="absolute top-3 right-3 bg-red-600 text-white px-3 py-1 rounded-full font-bold">
                    {product.discount}% OFF
                  </div>
                )}
              </div>

              {/* Thumbnail Gallery */}
              <div className="flex gap-2 w-full">
                {[0, 1, 2].map((i) => (
                  <img
                    key={i}
                    src={product.image}
                    alt={`View ${i + 1}`}
                    className="w-16 h-16 rounded border-2 border-gray-200 cursor-pointer hover:border-blue-600 object-cover"
                  />
                ))}
              </div>
            </div>

            {/* Details */}
            <div>
              {/* Badge */}
              {product.badge && (
                <div className="inline-block bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium mb-3">
                  {product.badge}
                </div>
              )}

              {/* Name & Category */}
              <h1 className="text-2xl font-bold text-gray-800 mb-2">
                {product.name}
              </h1>
              <p className="text-gray-600 text-sm mb-4">{product.category}</p>

              {/* Rating */}
              <div className="flex items-center gap-2 mb-4">
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-yellow-400">★</span>
                  ))}
                </div>
                <span className="text-sm text-gray-600">(1,234 ulasan)</span>
              </div>

              {/* Price */}
              <div className="mb-4">
                <div className="flex items-baseline gap-3 mb-2">
                  <span className="text-3xl font-bold text-blue-600">
                    {formatPrice(product.price)}
                  </span>
                  {product.originalPrice && (
                    <span className="text-lg text-gray-400 line-through">
                      {formatPrice(product.originalPrice)}
                    </span>
                  )}
                </div>
                {product.discount && (
                  <p className="text-green-600 font-medium text-sm">
                    Hemat {formatPrice(product.originalPrice! - product.price)}
                  </p>
                )}
              </div>

              {/* Stock Status */}
              <div className="mb-6 p-3 bg-green-50 rounded-lg border border-green-200">
                <p className="text-green-700 font-medium">✓ Tersedia di Gudang</p>
                <p className="text-sm text-gray-600">Stok: {Math.floor(Math.random() * 50) + 10} unit</p>
              </div>

              {/* Description */}
              {product.description && (
                <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                  <h3 className="font-semibold text-gray-800 mb-2">
                    Deskripsi Produk
                  </h3>
                  <p className="text-gray-700 text-sm leading-relaxed">
                    {product.description}
                  </p>
                </div>
              )}

              {/* Quantity Selector */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Jumlah
                </label>
                <div className="flex items-center gap-3 p-2 border rounded-lg w-fit">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-1 hover:bg-gray-100 rounded transition-colors"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <input
                    type="number"
                    value={quantity}
                    onChange={(e) =>
                      setQuantity(Math.max(1, parseInt(e.target.value) || 1))
                    }
                    className="w-12 text-center outline-none font-medium"
                  />
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-1 hover:bg-gray-100 rounded transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3">
                <button
                  onClick={handleAddToCart}
                  className="flex-1 bg-blue-600 text-white py-3 rounded-lg font-bold hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
                >
                  <ShoppingCart className="w-5 h-5" />
                  Tambah ke Keranjang
                </button>
                <button
                  onClick={() => setIsFavorite(!isFavorite)}
                  className={`px-6 py-3 rounded-lg font-bold transition-colors border-2 ${
                    isFavorite
                      ? 'bg-red-50 border-red-600 text-red-600'
                      : 'border-gray-300 text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <Heart
                    className="w-5 h-5"
                    fill={isFavorite ? 'currentColor' : 'none'}
                  />
                </button>
              </div>

              {/* Buy Now */}
              <button className="w-full mt-3 bg-green-600 text-white py-3 rounded-lg font-bold hover:bg-green-700 transition-colors">
                Beli Sekarang
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
