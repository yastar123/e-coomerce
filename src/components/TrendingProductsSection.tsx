

import { TrendingUp } from 'lucide-react';

interface TrendingProduct {
  id: string;
  name: string;
  price: number;
  image: string;
  badge?: string;
}

interface TrendingProductsSectionProps {
  products?: TrendingProduct[];
}

const defaultProducts: TrendingProduct[] = [
  {
    id: 'trend-1',
    name: 'Ellips Hair Vitamin Blister',
    price: 10900,
    image: 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=150&h=150&fit=crop',
    badge: 'Beli Banyak'
  },
  {
    id: 'trend-2',
    name: 'Mamy Poko Pants',
    price: 10900,
    image: 'https://images.unsplash.com/photo-1587880591857-f4b7d7cb338f?w=150&h=150&fit=crop',
    badge: 'Hot'
  },
  {
    id: 'trend-3',
    name: 'Susu Kental Manis',
    price: 12500,
    image: 'https://images.unsplash.com/photo-1599599810694-b5ac4dd64e8b?w=150&h=150&fit=crop'
  },
  {
    id: 'trend-4',
    name: 'Sari Roti Bread',
    price: 7600,
    image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=150&h=150&fit=crop',
    badge: 'Promo'
  },
  {
    id: 'trend-5',
    name: 'Beras Premium 5kg',
    price: 75000,
    image: 'https://images.unsplash.com/photo-1585238341710-4dd0e06a4c4b?w=150&h=150&fit=crop'
  }
];

export default function TrendingProductsSection({ products = defaultProducts }: TrendingProductsSectionProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm p-4 mt-6">
      <div className="flex items-center gap-2 mb-4">
        <TrendingUp className="w-5 h-5 text-blue-600" />
        <h3 className="font-bold text-gray-800">Trending Products</h3>
      </div>

      <div className="space-y-3">
        {products.map((product) => (
          <div
            key={product.id}
            className="flex gap-3 p-2 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer group"
          >
            {/* Product Image */}
            <div className="relative flex-shrink-0">
              <img
                src={product.image}
                alt={product.name}
                className="w-12 h-12 rounded-lg object-cover group-hover:scale-105 transition-transform"
              />
              {product.badge && (
                <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-xs font-semibold px-1.5 py-0.5 rounded-full">
                  {product.badge}
                </span>
              )}
            </div>

            {/* Product Info */}
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-800 line-clamp-2 group-hover:text-blue-600 transition-colors">
                {product.name}
              </p>
              <p className="text-sm font-bold text-blue-600 mt-1">
                Rp {product.price.toLocaleString('id-ID')}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
