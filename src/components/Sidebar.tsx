

export default function Sidebar() {
  return (
    <aside className="hidden lg:block">
      {/* Trending Products */}
      <div className="bg-white rounded-lg shadow-sm p-4 mb-4">
        <h3 className="font-bold text-lg mb-4">Trending Products</h3>
        <div className="space-y-3">
          {[
            { name: 'Go Filter Merah 12\'s', price: 28500 },
            { name: 'Rose Brand Minyak 18 Lt', price: 414500 },
            { name: 'Tepung Tapioka 25kg', price: 339500 }
          ].map((product, index) => (
            <div key={index} className="flex gap-3 pb-3 border-b last:border-b-0 cursor-pointer hover:bg-gray-50 -mx-4 px-4 py-2 rounded">
              <img
                src="https://images.unsplash.com/photo-1599599810694-b5ac4dd64e8b?w=50&h=50&fit=crop"
                alt={product.name}
                className="w-12 h-12 rounded object-cover"
              />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-800 line-clamp-2">
                  {product.name}
                </p>
                <p className="text-blue-600 font-bold text-sm mt-1">
                  Rp {product.price.toLocaleString('id-ID')}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Promo Banner */}
      <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg shadow-sm p-4 text-white">
        <h4 className="font-bold mb-2">Promosi Spesial</h4>
        <p className="text-sm mb-3">Dapatkan diskon hingga 50% untuk produk pilihan setiap hari!</p>
        <button className="bg-white text-blue-600 px-4 py-2 rounded font-medium text-sm hover:bg-gray-100 transition-colors w-full">
          Lihat Penawaran
        </button>
      </div>
    </aside>
  );
}
