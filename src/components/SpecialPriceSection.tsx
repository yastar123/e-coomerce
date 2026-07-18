

import { useState } from 'react';
import SpecialPriceHeader from './SpecialPriceHeader';
import PromoBannerSection from './PromoBannerSection';
import TrendingProductsSection from './TrendingProductsSection';
import SpecialPriceGrid from './SpecialPriceGrid';
import { Product } from '@/lib/products';

interface SpecialPriceSectionProps {
  products: Product[];
  onAddToCart: (product: Product, quantity?: number) => void;
}

export default function SpecialPriceSection({
  products,
  onAddToCart
}: SpecialPriceSectionProps) {
  const [sortBy, setSortBy] = useState('default');

  // Sort products based on selected option
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
      {/* Header */}
      <SpecialPriceHeader sortBy={sortBy} onSortChange={setSortBy} />

      {/* Main Content - Sidebar + Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar - Left */}
        <div className="lg:col-span-1">
          <PromoBannerSection />
          <TrendingProductsSection />
        </div>

        {/* Product Grid - Right */}
        <div className="lg:col-span-3">
          <SpecialPriceGrid
            products={sortedProducts}
            onAddToCart={onAddToCart}
          />
        </div>
      </div>
    </div>
  );
}
