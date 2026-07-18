import { Product } from '@/lib/products';
import { Heart, Plus } from 'lucide-react';
import { Link } from '@/lib/next-shims';
import { useState } from 'react';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
  onClick?: () => void;
  compact?: boolean;
  lessRounded?: boolean;
}

const formatPrice = (price: number) => `Rp ${price.toLocaleString('id-ID')}`;

export default function ProductCard({
  product,
  onAddToCart,
  compact = false,
  lessRounded = false,
}: ProductCardProps) {
  const [isFavorite, setIsFavorite] = useState(false);

  return (
    <Link href={`/products/${product.id}`}>
      <div
        className={`bg-white border border-[#e8ecf1] hover:border-[#00B4E6]/40 hover:shadow-[0_20px_40px_-20px_rgba(59,130,246,0.15)] transition-all group cursor-pointer h-full flex flex-col ${
          lessRounded ? 'rounded-lg' : 'rounded-2xl'
        } ${compact ? 'p-2.5 sm:p-3 space-y-2' : 'p-3 sm:p-4 space-y-3'}`}
      >
        <div
          className={`relative bg-[#fafbfc] overflow-hidden ${
            lessRounded ? 'rounded-lg' : 'rounded-xl'
          } ${compact ? 'aspect-[4/3]' : 'aspect-square'}`}
        >
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          {product.discount ? (
            <span className="absolute top-2.5 left-2.5 bg-white/95 backdrop-blur text-[#00B4E6] text-[10px] font-bold px-2 py-1 rounded-full border border-[#e8ecf1]">
              −{product.discount}%
            </span>
          ) : product.badge ? (
            <span className="absolute top-2.5 left-2.5 bg-white/95 backdrop-blur text-[#1e293b] text-[10px] font-bold px-2 py-1 rounded-full border border-[#e8ecf1]">
              {product.badge}
            </span>
          ) : null}
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setIsFavorite(!isFavorite);
            }}
            className="absolute top-2.5 right-2.5 bg-white/90 backdrop-blur rounded-full p-1.5 border border-[#e8ecf1] hover:bg-white transition-colors"
            aria-label="Favorit"
          >
            <Heart
              className="w-3.5 h-3.5"
              fill={isFavorite ? '#00B4E6' : 'none'}
              color={isFavorite ? '#00B4E6' : '#94a3b8'}
            />
          </button>
        </div>

        <div className="flex-1 flex flex-col space-y-1.5 px-0.5">
          <p className="text-[#94a3b8] text-[10px] uppercase font-bold tracking-widest line-clamp-1">
            {product.category}
          </p>
          <h3
            className={`text-sm font-medium text-[#1e293b] leading-snug line-clamp-2 ${
              compact ? 'min-h-[2rem]' : 'min-h-[2.5rem]'
            }`}
          >
            {product.name}
          </h3>
          <div className="pt-1 mt-auto">
            {product.originalPrice ? (
              <span className="text-[11px] text-[#94a3b8] line-through block">
                {formatPrice(product.originalPrice)}
              </span>
            ) : (
              <span className="text-[11px] block opacity-0 select-none">.</span>
            )}
            <span className="text-base sm:text-lg font-bold text-[#1e293b]">
              {formatPrice(product.price)}
            </span>
          </div>
        </div>

        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            onAddToCart(product);
          }}
          disabled={!product.inStock}
          className={`w-full inline-flex items-center justify-center gap-1.5 bg-[#fafbfc] border border-[#e8ecf1] text-[#1e293b] text-xs font-semibold hover:bg-[#00B4E6] hover:text-white hover:border-[#00B4E6] transition-all disabled:opacity-50 disabled:cursor-not-allowed ${
            lessRounded ? 'rounded-lg' : 'rounded-xl'
          } ${compact ? 'py-2' : 'py-2.5'}`}
        >
          <Plus className="w-3.5 h-3.5" />
          {product.inStock ? 'Keranjang' : 'Habis'}
        </button>
      </div>
    </Link>
  );
}