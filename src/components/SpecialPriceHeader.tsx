

import { ChevronDown } from 'lucide-react';

interface SpecialPriceHeaderProps {
  sortBy?: string;
  onSortChange?: (sort: string) => void;
}

export default function SpecialPriceHeader({ sortBy = 'default', onSortChange }: SpecialPriceHeaderProps) {
  const sortOptions = [
    { value: 'default', label: 'Default' },
    { value: 'newest', label: 'Terbaru' },
    { value: 'price-low', label: 'Harga Terendah' },
    { value: 'price-high', label: 'Harga Tertinggi' },
    { value: 'best-seller', label: 'Terlaris' }
  ];

  return (
    <div className="flex items-end justify-between mb-6 gap-4">
      <div className="min-w-0">
        <h2 className="font-sans text-3xl md:text-4xl text-[#1e293b] leading-tight">
          Harga Spesial
        </h2>
        <p className="text-sm text-[#94a3b8] mt-1">
          Penawaran pilihan minggu ini — stok terbatas.
        </p>
      </div>
      <select
        value={sortBy}
        onChange={(e) => onSortChange?.(e.target.value)}
        className="shrink-0 px-4 py-2 border border-[#e8ecf1] rounded-full text-xs font-semibold bg-white text-[#1e293b] outline-none focus:border-[#00B4E6] cursor-pointer"
      >
        {sortOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}
