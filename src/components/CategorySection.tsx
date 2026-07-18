

interface CategorySectionProps {
  categories: string[];
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
}

export default function CategorySection({
  categories,
  selectedCategory,
  onSelectCategory
}: CategorySectionProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
      <h3 className="text-lg font-bold mb-4">Belanja Berdasarkan Kategori</h3>
      <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-3">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => onSelectCategory(category)}
            className={`flex items-center justify-center p-3 rounded-lg transition-all font-medium text-sm ${
              selectedCategory === category
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <span className="text-center line-clamp-2">
              {category}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
