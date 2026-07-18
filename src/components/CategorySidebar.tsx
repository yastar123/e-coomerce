

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const CATEGORIES = [
  'Biscuit/Snacks',
  'Interior & Bedding',
  'Detergent',
  'Bulk Product',
  'H&B',
  'Sauces & Spices',
  'Milk/Coffee/Tea',
  'Drinks',
  'Fish',
  'Meat',
  'Fruits',
  'Vegetables',
  'Dairy & Frozen',
  'Kitchen',
  'Bathroom',
  'Textile',
  'Stationary/Toys',
  'Bakery',
  'DIY',
  'Small Appliance',
  'Big Appliance'
];

export default function CategorySidebar() {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="mb-8">
      {/* Mobile Header */}
      <div className="lg:hidden mb-4">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center justify-between w-full px-4 py-3 bg-white rounded-lg border border-gray-200 hover:border-blue-600 transition-colors"
        >
          <span className="font-bold text-gray-800">Kategori</span>
          <ChevronDown
            size={20}
            className={`text-gray-600 transition-transform ${
              isOpen ? 'rotate-180' : ''
            }`}
          />
        </button>
      </div>

      {/* Desktop Sidebar */}
      <div className={`${isOpen ? 'block' : 'hidden'} lg:block`}>
        <h3 className="hidden lg:block font-bold text-lg text-gray-800 mb-4">
          Kategori
        </h3>

        <div className="bg-white rounded-lg shadow-sm p-4 lg:p-0 lg:shadow-none">
          <div className="space-y-2 lg:space-y-1">
            {CATEGORIES.map((category, index) => (
              <a
                key={index}
                href="#"
                className="block px-3 py-2.5 lg:py-1.5 text-sm text-gray-700 hover:text-blue-600 hover:bg-blue-50 lg:hover:bg-transparent rounded transition-colors duration-200"
              >
                {category}
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
