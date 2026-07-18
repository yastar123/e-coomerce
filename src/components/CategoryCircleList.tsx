

import { useRef, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface CircleCategory {
  name: string;
  icon: string;
}

const CIRCLE_CATEGORIES: CircleCategory[] = [
  { name: 'Vegetables', icon: '🥬' },
  { name: 'Beverages', icon: '🥤' },
  { name: 'Meats & Seafood', icon: '🥩' },
  { name: 'Breakfast', icon: '🍞' },
  { name: 'Frozen Food', icon: '❄️' },
  { name: 'Milk & Dairies', icon: '🥛' },
  { name: 'Pet Food', icon: '🐾' }
];

export default function CategoryCircleList() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const handleScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 300;
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="mb-12">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        Belanja Berdasarkan Kategori
      </h2>

      {/* Container with scroll buttons */}
      <div className="relative">
        {/* Left Scroll Button */}
        {canScrollLeft && (
          <button
            onClick={() => scroll('left')}
            className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 z-10 items-center justify-center w-10 h-10 bg-white rounded-full shadow-lg hover:shadow-xl hover:bg-gray-50 transition-all"
          >
            <ChevronLeft size={20} className="text-gray-600" />
          </button>
        )}

        {/* Right Scroll Button */}
        {canScrollRight && (
          <button
            onClick={() => scroll('right')}
            className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 z-10 items-center justify-center w-10 h-10 bg-white rounded-full shadow-lg hover:shadow-xl hover:bg-gray-50 transition-all"
          >
            <ChevronRight size={20} className="text-gray-600" />
          </button>
        )}

        {/* Scroll Container */}
        <div
          ref={scrollContainerRef}
          onScroll={handleScroll}
          className="flex gap-6 overflow-x-auto scrollbar-hide px-2 md:px-12"
        >
          {CIRCLE_CATEGORIES.map((category, index) => (
            <div
              key={index}
              className="flex-shrink-0 flex flex-col items-center gap-3 cursor-pointer group"
            >
              {/* Circle Background */}
              <div className="w-24 h-24 md:w-28 md:h-28 rounded-full bg-gray-100 flex items-center justify-center group-hover:bg-blue-50 transition-colors">
                {/* Icon/Image */}
                <div className="text-5xl md:text-6xl">{category.icon}</div>
              </div>
              {/* Label */}
              <p className="text-center text-sm font-medium text-gray-700 group-hover:text-blue-600 transition-colors max-w-[100px]">
                {category.name}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Hide scrollbar styling */}
      <style>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}
