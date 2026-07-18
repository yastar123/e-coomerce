import { createFileRoute } from '@tanstack/react-router';

import { TrendingUp, Package, ShoppingCart, Users, DollarSign } from 'lucide-react';
import { products as aerovaProducts } from '@/lib/products';


function AdminDashboard() {
  const totalProduk = aerovaProducts.length;
  const stats = [
    {
      label: 'Total Produk',
      value: String(totalProduk),
      icon: Package,
      color: 'bg-blue-100',
      textColor: 'text-blue-600',
      trend: 'Katalog Aerova aktif',
    },
    {
      label: 'Total Pesanan',
      value: '1,248',
      icon: ShoppingCart,
      color: 'bg-green-100',
      textColor: 'text-green-600',
      trend: '+18% dari bulan lalu',
    },
    {
      label: 'Total Pelanggan',
      value: '3,472',
      icon: Users,
      color: 'bg-purple-100',
      textColor: 'text-purple-600',
      trend: '+9% dari bulan lalu',
    },
    {
      label: 'Total Penjualan',
      value: 'Rp 128.6M',
      icon: DollarSign,
      color: 'bg-orange-100',
      textColor: 'text-orange-600',
      trend: '+24% dari bulan lalu',
    },
  ];


  const recentOrders = [
    {
      id: '#ORD-001',
      customer: 'Budi Santoso',
      products: 'Aerova Botol 600ml x 2 dus',
      amount: 'Rp 130,000',
      date: '2026-07-15',
      status: 'completed',
    },
    {
      id: '#ORD-002',
      customer: 'Siti Nurhaliza',
      products: 'Aerova Cup 220ml x 5 dus',
      amount: 'Rp 110,000',
      date: '2026-07-15',
      status: 'pending',
    },
    {
      id: '#ORD-003',
      customer: 'Ahmad Rahman',
      products: 'Aerova Botol 600ml x 12 pcs',
      amount: 'Rp 36,000',
      date: '2026-07-14',
      status: 'shipped',
    },
    {
      id: '#ORD-004',
      customer: 'Rina Wijaya',
      products: 'Aerova Cup 220ml 1 Dus x 3',
      amount: 'Rp 66,000',
      date: '2026-07-14',
      status: 'completed',
    },
    {
      id: '#ORD-005',
      customer: 'Doni Prasetyo',
      products: 'Aerova Cup 220ml x 24 pcs',
      amount: 'Rp 12,000',
      date: '2026-07-13',
      status: 'cancelled',
    },
  ];

  const salesByProduct: Record<string, number> = {
    '1': 356,
    '2': 210,
    '3': 480,
    '4': 512,
  };
  const topProducts = [...aerovaProducts]
    .sort((a, b) => (salesByProduct[b.id] ?? 0) - (salesByProduct[a.id] ?? 0))
    .map((p) => {
      const sales = salesByProduct[p.id] ?? 100;
      const revenue = p.price * sales;
      const formatted =
        revenue >= 1_000_000
          ? `Rp ${(revenue / 1_000_000).toFixed(1)}M`
          : `Rp ${(revenue / 1_000).toFixed(0)}K`;
      return { name: p.name, image: p.image, sales, revenue: formatted };
    });


  const getStatusBadge = (status: string) => {
    const badges: Record<string, { bg: string; text: string }> = {
      completed: { bg: 'bg-green-100', text: 'text-green-700' },
      pending: { bg: 'bg-yellow-100', text: 'text-yellow-700' },
      shipped: { bg: 'bg-blue-100', text: 'text-blue-700' },
      cancelled: { bg: 'bg-red-100', text: 'text-red-700' },
    };
    return badges[status] || badges.pending;
  };

  return (
    <div className="space-y-8">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.label}
              className="bg-white rounded-lg shadow-sm p-6 border border-gray-200 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <p className="text-gray-600 text-sm font-medium">{stat.label}</p>
                  <p className="text-3xl font-bold text-gray-900 mt-2">{stat.value}</p>
                </div>
                <div className={`${stat.color} p-3 rounded-lg`}>
                  <Icon className={`w-6 h-6 ${stat.textColor}`} />
                </div>
              </div>
              <div className="flex items-center gap-1 text-green-600 text-xs font-medium">
                <TrendingUp className="w-3 h-3" />
                {stat.trend}
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Orders */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900">Pesanan Terbaru</h2>
              <a href="/admin/orders" className="text-blue-600 text-sm font-medium hover:underline">
                Lihat Semua
              </a>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-200">
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">ID Pesanan</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">Pelanggan</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">Produk</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">Total</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {recentOrders.map((order) => (
                    <tr key={order.id} className="border-b border-gray-200 hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <span className="font-semibold text-gray-900">{order.id}</span>
                      </td>
                      <td className="px-6 py-4 text-gray-700">{order.customer}</td>
                      <td className="px-6 py-4 text-gray-700 text-sm">{order.products}</td>
                      <td className="px-6 py-4 font-semibold text-gray-900">{order.amount}</td>
                      <td className="px-6 py-4">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusBadge(
                            order.status
                          ).bg} ${getStatusBadge(order.status).text}`}
                        >
                          {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Top Products */}
        <div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900">Produk Terlaris</h2>
              <a href="/admin/products" className="text-blue-600 text-sm font-medium hover:underline">
                Lihat Semua
              </a>
            </div>
            <div className="divide-y divide-gray-200">
              {topProducts.map((product, idx) => (
                <div key={product.name} className="px-6 py-4 hover:bg-gray-50">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center text-xs font-bold text-blue-600 shrink-0">
                      {idx + 1}
                    </div>
                    <img src={product.image} alt={product.name} className="w-10 h-10 object-contain rounded-md bg-gray-50 border border-gray-200 shrink-0" />
                    <span className="font-medium text-gray-900 text-sm line-clamp-2">{product.name}</span>
                  </div>
                  <div className="flex items-center justify-between pl-12">
                    <p className="text-xs text-gray-500">{product.sales} penjualan</p>
                    <p className="text-xs font-semibold text-green-600">{product.revenue}</p>
                  </div>
                </div>

              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


export const Route = createFileRoute('/admin/')({ component: AdminDashboard });
