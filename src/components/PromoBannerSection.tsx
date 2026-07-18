

export default function PromoBannerSection() {
  return (
    <div className="space-y-4">
      {/* Large Promo Banner */}
      <div className="bg-gradient-to-r from-orange-400 to-red-500 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow cursor-pointer relative h-48">
        <div className="absolute inset-0 opacity-10 bg-pattern"></div>
        <div className="relative h-full flex items-center justify-between p-4">
          <div className="text-white">
            <p className="text-sm font-semibold opacity-90">HARGA SPESIAL UNTUNG MAKSIMAL</p>
            <p className="text-3xl font-bold mt-2">Rp 17.600</p>
            <p className="text-sm mt-1 opacity-90">Periode: 14-27 Juli</p>
          </div>
          <div className="text-6xl opacity-20">🎯</div>
        </div>
      </div>

      {/* Small Promo Banners */}
      <div className="space-y-3">
        {/* Banner 1 */}
        <div className="bg-white rounded-lg border-l-4 border-orange-500 p-4 shadow-sm hover:shadow-md transition-shadow cursor-pointer">
          <p className="text-xs text-gray-500 uppercase tracking-wide">Promo</p>
          <p className="font-semibold text-gray-800 text-sm">Bayi Hemat</p>
          <p className="text-lg font-bold text-orange-600 mt-1">Rp 12.500</p>
        </div>

        {/* Banner 2 */}
        <div className="bg-white rounded-lg border-l-4 border-red-500 p-4 shadow-sm hover:shadow-md transition-shadow cursor-pointer">
          <p className="text-xs text-gray-500 uppercase tracking-wide">Promo</p>
          <p className="font-semibold text-gray-800 text-sm">Minuman Segar</p>
          <p className="text-lg font-bold text-red-600 mt-1">Rp 6.500</p>
        </div>

        {/* Banner 3 */}
        <div className="bg-white rounded-lg border-l-4 border-orange-500 p-4 shadow-sm hover:shadow-md transition-shadow cursor-pointer">
          <p className="text-xs text-gray-500 uppercase tracking-wide">Promo</p>
          <p className="font-semibold text-gray-800 text-sm">Paket Hemat</p>
          <p className="text-lg font-bold text-orange-600 mt-1">Rp 24.900</p>
        </div>
      </div>
    </div>
  );
}
