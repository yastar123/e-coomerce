

import { useState } from 'react';
import ProductCard from './ProductCard';
import { Product } from '@/lib/products';

interface SpecialPriceGridProps {
  products: Product[];
  onAddToCart: (product: Product, quantity?: number) => void;
}

export default function SpecialPriceGrid({
  products,
  onAddToCart
}: SpecialPriceGridProps) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-3 md:gap-4">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onAddToCart={onAddToCart}
          compact
          lessRounded
        />
      ))}
    </div>
  );
}
