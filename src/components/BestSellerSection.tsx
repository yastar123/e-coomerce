import { Product } from '@/lib/products';
import ProductCard from './ProductCard';

interface BestSellerSectionProps {
  products: Product[];
  onAddToCart: (product: Product, quantity: number) => void;
}

export default function BestSellerSection({
  products,
  onAddToCart,
}: BestSellerSectionProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onAddToCart={(p) => onAddToCart(p, 1)}
          compact
        />
      ))}
    </div>
  );
}
