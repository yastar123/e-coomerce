import { createFileRoute } from '@tanstack/react-router';

import { useState } from 'react';
import { Link } from '@/lib/next-shims';
import { Search, ChevronDown, Eye, X, MapPin, Phone, Package } from 'lucide-react';

interface OrderItem {
  name: string;
  quantity: number;
  price: number;
}

interface Order {
  id: string;
  customer: string;
  email: string;
  phone: string;
  address: string;
  items: OrderItem[];
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  date: string;
}

function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([
    {
      id: '#ORD-001',
      customer: 'Budi Santoso',
      email: 'budi@email.com',
      phone: '08123456789',
      address: 'Jl. Merdeka No. 123, Jakarta',
      items: [
        { name: 'Beras Merah Premium', quantity: 2, price: 25000 },
        { name: 'Minyak Goreng 2L', quantity: 1, price: 22000 },
      ],
      total: 72000,
      status: 'delivered',
      date: '2024-01-15',
    },
    {
      id: '#ORD-002',
      customer: 'Siti Nurhaliza',
      email: 'siti@email.com',
      phone: '08234567890',
      address: 'Jl. Ahmad Yani No. 456, Bandung',
      items: [
        { name: 'Gula Pasir 1kg', quantity: 5, price: 20000 },
      ],
      total: 100000,
      status: 'shipped',
      date: '2024-01-15',
    },
    {
      id: '#ORD-003',
      customer: 'Ahmad Rahman',
      email: 'ahmad@email.com',
      phone: '08345678901',
      address: 'Jl. Sudirman No. 789, Surabaya',
      items: [
        { name: 'Telur Ayam 1 Lusin', quantity: 2, price: 19500 },
      ],
      total: 39000,
      status: 'processing',
      date: '2024-01-14',
    },
    {
      id: '#ORD-004',
      customer: 'Rina Wijaya',
      email: 'rina@email.com',
      phone: '08456789012',
      address: 'Jl. Diponegoro No. 321, Medan',
      items: [
        { name: 'Kopi Premium 500g', quantity: 3, price: 20000 },
        { name: 'Beras Merah Premium', quantity: 4, price: 25000 },
      ],
      total: 160000,
      status: 'pending',
      date: '2024-01-14',
    },
    {
      id: '#ORD-005',
      customer: 'Doni Prasetyo',
      email: 'doni@email.com',
      phone: '08567890123',
      address: 'Jl. Gatot Subroto No. 654, Yogyakarta',
      items: [
        { name: 'Minyak Goreng 2L', quantity: 1, price: 22000 },
      ],
      total: 22000,
      status: 'cancelled',
      date: '2024-01-13',
    },
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled'>('all');
  const [showModal, setShowModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [newStatus, setNewStatus] = useState<Order['status']>('pending');

  const filteredOrders = orders.filter((o) => {
    const matchesSearch =
      o.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      o.customer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || o.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const openModal = (order: Order) => {
    setSelectedOrder(order);
    setNewStatus(order.status);
    setShowModal(true);
  };

  const updateStatus = () => {
    if (selectedOrder) {
      setOrders(
        orders.map((o) =>
          o.id === selectedOrder.id ? { ...o, status: newStatus } : o
        )
      );
      setShowModal(false);
    }
  };

  const getStatusColor = (status: Order['status']) => {
    const colors: Record<Order['status'], { bg: string; text: string }> = {
      pending: { bg: 'bg-yellow-100', text: 'text-yellow-700' },
      processing: { bg: 'bg-blue-100', text: 'text-blue-700' },
      shipped: { bg: 'bg-purple-100', text: 'text-purple-700' },
      delivered: { bg: 'bg-green-100', text: 'text-green-700' },
      cancelled: { bg: 'bg-red-100', text: 'text-red-700' },
    };
    return colors[status];
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Pesanan</h1>
        <p className="text-gray-500 mt-1">Kelola semua pesanan dari pelanggan</p>
      </div>

      {/* Filters & Search */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Cari pesanan atau pelanggan..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Status Filter */}
          <div className="relative">
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value as any)}
              className="appearance-none px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white pr-10"
            >
              <option value="all">Semua Status</option>
              <option value="pending">Pending</option>
              <option value="processing">Diproses</option>
              <option value="shipped">Dikirim</option>
              <option value="delivered">Terima</option>
              <option value="cancelled">Batal</option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Orders List */}
      <div className="space-y-4">
        {filteredOrders.length > 0 ? (
          filteredOrders.map((order) => (
            <div
              key={order.id}
              className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow"
            >
              {/* Order Header */}
              <div className="px-6 py-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-gray-200">
                <div className="flex-1">
                  <div className="flex items-center gap-4">
                    <div>
                      <h3 className="font-semibold text-gray-900">{order.id}</h3>
                      <p className="text-sm text-gray-500">{order.date}</p>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-4 justify-between md:justify-end">
                  <div className="text-right">
                    <p className="font-semibold text-gray-900">Rp {order.total.toLocaleString('id-ID')}</p>
                    <p className="text-sm text-gray-500">{order.customer}</p>
                  </div>
                  <span
                    className={`px-4 py-2 rounded-full text-sm font-semibold ${getStatusColor(
                      order.status
                    ).bg} ${getStatusColor(order.status).text}`}
                  >
                    {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                  </span>
                </div>
              </div>

              {/* Order Details */}
              <div className="px-6 py-4 space-y-3">
                {/* Customer Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-gray-400" />
                    <span>{order.phone}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-gray-400">📧</span>
                    <span>{order.email}</span>
                  </div>
                  <div className="flex items-start gap-2 md:col-span-2">
                    <MapPin className="w-4 h-4 text-gray-400 mt-0.5" />
                    <span>{order.address}</span>
                  </div>
                </div>

                {/* Items */}
                <div className="pt-3 border-t border-gray-200">
                  <div className="flex items-center gap-2 mb-3">
                    <Package className="w-4 h-4 text-gray-600" />
                    <span className="text-sm font-semibold text-gray-700">{order.items.length} Item</span>
                  </div>
                  <div className="space-y-2">
                    {order.items.map((item, idx) => (
                      <div key={idx} className="flex items-center justify-between text-sm">
                        <span className="text-gray-700">
                          {item.name} <span className="text-gray-500">x{item.quantity}</span>
                        </span>
                        <span className="text-gray-900 font-medium">
                          Rp {(item.price * item.quantity).toLocaleString('id-ID')}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Action */}
                <div className="pt-3 border-t border-gray-200 flex gap-2">
                  <Link
                    href={`/admin/orders/${order.id.replace('#ORD-', '')}`}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
                  >
                    <Eye className="w-4 h-4" />
                    Lihat Detail
                  </Link>
                  <button
                    onClick={() => openModal(order)}
                    className="flex items-center justify-center gap-2 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors text-sm font-medium"
                  >
                    Update Status
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
            <p className="text-gray-500">Tidak ada pesanan yang sesuai dengan pencarian</p>
          </div>
        )}
      </div>

      {/* Modal */}
      {showModal && selectedOrder && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 px-6 py-4 border-b border-gray-200 flex items-center justify-between bg-white">
              <h2 className="text-xl font-bold text-gray-900">Update Status Pesanan</h2>
              <button
                onClick={() => setShowModal(false)}
                className="p-1 hover:bg-gray-100 rounded-lg"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div>
                <p className="text-sm text-gray-600 mb-2">ID Pesanan</p>
                <p className="font-semibold text-gray-900">{selectedOrder.id}</p>
              </div>

              <div>
                <p className="text-sm text-gray-600 mb-2">Pelanggan</p>
                <p className="text-gray-900">{selectedOrder.customer}</p>
              </div>

              <div>
                <p className="text-sm text-gray-600 mb-2">Status Saat Ini</p>
                <span
                  className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(
                    selectedOrder.status
                  ).bg} ${getStatusColor(selectedOrder.status).text}`}
                >
                  {selectedOrder.status.charAt(0).toUpperCase() + selectedOrder.status.slice(1)}
                </span>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Ubah Status</label>
                <select
                  value={newStatus}
                  onChange={(e) => setNewStatus(e.target.value as Order['status'])}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                >
                  <option value="pending">Pending</option>
                  <option value="processing">Diproses</option>
                  <option value="shipped">Dikirim</option>
                  <option value="delivered">Terima</option>
                  <option value="cancelled">Batal</option>
                </select>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                <p className="text-xs text-blue-700">
                  <span className="font-semibold">Tips:</span> Update status akan memberitahukan pelanggan melalui email dan notifikasi aplikasi.
                </p>
              </div>
            </div>

            <div className="px-6 py-4 border-t border-gray-200 flex gap-3 justify-end">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Batal
              </button>
              <button
                onClick={updateStatus}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Update Status
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}


export const Route = createFileRoute('/admin/orders/')({ component: OrdersPage });
