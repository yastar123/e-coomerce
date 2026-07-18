import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface Category {
  id: string;
  name: string;
  image: string;
}

interface CategoryBrowseSectionProps {
  categories: Category[];
}

export default function CategoryBrowseSection({ categories }: CategoryBrowseSectionProps) {
  const [scrollPosition, setScrollPosition] = useState(0);
  const scrollContainer = (direction: 'left' | 'right') => {
    const container = document.getElementById('category-scroll');
    if (container) {
      const scrollAmount = 400;
      const newPosition =
        direction === 'left'
          ? scrollPosition - scrollAmount
          : scrollPosition + scrollAmount;
      container.scrollLeft = newPosition;
      setScrollPosition(newPosition);
    }
  };

  return (
    <div>
      {/* Nav arrows */}
      <div className="flex items-center justify-end gap-2 mb-4">
        <button
          onClick={() => scrollContainer('left')}
          className="w-9 h-9 inline-flex items-center justify-center rounded-full border border-[#e8ecf1] bg-white text-[#94a3b8] hover:text-[#00B4E6] hover:border-[#00B4E6]/40 transition-colors"
          aria-label="Scroll left"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
        <button
          onClick={() => scrollContainer('right')}
          className="w-9 h-9 inline-flex items-center justify-center rounded-full border border-[#e8ecf1] bg-white text-[#94a3b8] hover:text-[#00B4E6] hover:border-[#00B4E6]/40 transition-colors"
          aria-label="Scroll right"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* Scroll container */}
      <div
        id="category-scroll"
        className="flex gap-5 md:gap-6 overflow-x-auto pb-3 scroll-smooth no-scrollbar"
      >
        {categories.map((category) => (
          <div
            key={category.id}
            className="flex flex-col items-center gap-3 flex-shrink-0 cursor-pointer group w-28 md:w-32"
          >
            <div className="w-28 h-28 md:w-32 md:h-32 rounded-full bg-white border border-[#e8ecf1] overflow-hidden group-hover:border-[#00B4E6]/40 group-hover:shadow-[0_20px_40px_-20px_rgba(59,130,246,0.25)] transition-all">
              <img
                src={category.image}
                alt={category.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
            </div>
            <span className="text-xs md:text-sm font-medium text-[#1e293b] text-center line-clamp-2 group-hover:text-[#00B4E6] transition-colors">
              {category.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
