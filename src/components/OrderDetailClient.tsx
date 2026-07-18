
import { useState } from 'react';
import { Link } from '@/lib/next-shims';
import { ArrowLeft, Printer, Package, Truck, CheckCircle, Clock, MapPin, Mail, Phone, CreditCard, Download } from 'lucide-react';

interface OrderDetailClientProps {
  orderId: string;
}

export default function OrderDetailClient({ orderId }: OrderDetailClientProps) {
  const [statusUpdateOpen, setStatusUpdateOpen] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState('Diproses');

  // Mock order data
  const order = {
    id: orderId,
    orderNumber: `#ORD-${orderId.toUpperCase()}`,
    date: '2024-01-15',
    time: '14:30',
    status: 'Diproses',
    totalPrice: 450000,
    discountAmount: 50000,
    shippingCost: 25000,
    finalPrice: 425000,
    paymentMethod: 'Transfer Bank',
    paymentStatus: 'Sukses',
    customer: {
      name: 'Budi Santoso',
      email: 'budi@email.com',
      phone: '+62812-3456-7890',
      address: 'Jl. Sudirman No. 123, Jakarta Pusat, 12000',
      city: 'Jakarta',
      province: 'DKI Jakarta',
      zipCode: '12000'
    },
    items: [
      {
        id: '1',
        name: 'Minyak Goreng Murni 2L',
        category: 'Makanan & Minuman',
        price: 75000,
        quantity: 2,
        subtotal: 150000,
        image: '🧴'
      },
      {
        id: '2',
        name: 'Gula Pasir Premium 1kg',
        category: 'Makanan & Minuman',
        price: 80000,
        quantity: 2,
        subtotal: 160000,
        image: '🍯'
      },
      {
        id: '3',
        name: 'Garam Halus 500g',
        category: 'Makanan & Minuman',
        price: 15000,
        quantity: 2,
        subtotal: 30000,
        image: '🧂'
      },
      {
        id: '4',
        name: 'Tepung Terigu 1kg',
        category: 'Makanan & Minuman',
        price: 35000,
        quantity: 2,
        subtotal: 70000,
        image: '🌾'
      }
    ],
    timeline: [
      {
        status: 'Pesanan Diterima',
        date: '2024-01-15',
        time: '14:30',
        completed: true,
        icon: '📋'
      },
      {
        status: 'Pembayaran Dikonfirmasi',
        date: '2024-01-15',
        time: '15:00',
        completed: true,
        icon: '✓'
      },
      {
        status: 'Diproses di Warehouse',
        date: '2024-01-16',
        time: '09:00',
        completed: true,
        icon: '📦'
      },
      {
        status: 'Siap Dikirim',
        date: '2024-01-16',
        time: '14:00',
        completed: false,
        icon: '🚚'
      },
      {
        status: 'Dalam Pengiriman',
        date: '-',
        time: '-',
        completed: false,
        icon: '🚛'
      },
      {
        status: 'Pesanan Diterima',
        date: '-',
        time: '-',
        completed: false,
        icon: '✓'
      }
    ],
    shipping: {
      provider: 'JNE Express',
      trackingNumber: 'JNE123456789',
      estimatedDate: '2024-01-18',
      actualDate: null
    },
    notes: 'Pelanggan meminta pengiriman dalam kondisi hati-hati'
  };

  const statusOptions = ['Pending', 'Diproses', 'Siap Dikirim', 'Dikirim', 'Terima', 'Batal'];

  const handleStatusUpdate = (newStatus: string) => {
    setSelectedStatus(newStatus);
    setStatusUpdateOpen(false);
    alert(`Status pesanan diperbarui menjadi: ${newStatus}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/admin/orders" className="p-2 hover:bg-gray-100 rounded-lg">
                <ArrowLeft className="w-5 h-5 text-gray-700" />
              </Link>
              <div>
                <h1 className="text-2xl font-bold text-gray-800">Detail Pesanan</h1>
                <p className="text-sm text-gray-600 mt-1">{order.orderNumber}</p>
              </div>
            </div>
            <div className="flex gap-2">
              <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-medium transition-colors">
                <Printer className="w-4 h-4" />
                <span className="hidden sm:inline">Cetak</span>
              </button>
              <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-medium transition-colors">
                <Download className="w-4 h-4" />
                <span className="hidden sm:inline">PDF</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Order Info & Items */}
          <div className="lg:col-span-2 space-y-6">
            {/* Status & Date Info */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold text-gray-800">Informasi Pesanan</h2>
                <button
                  onClick={() => setStatusUpdateOpen(!statusUpdateOpen)}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    order.status === 'Diproses'
                      ? 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200'
                      : order.status === 'Dikirim'
                      ? 'bg-blue-100 text-blue-800 hover:bg-blue-200'
                      : order.status === 'Terima'
                      ? 'bg-green-100 text-green-800 hover:bg-green-200'
                      : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                  }`}
                >
                  {order.status}
                </button>
              </div>

              {statusUpdateOpen && (
                <div className="mb-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
                  <p className="text-sm font-medium text-gray-700 mb-3">Ubah Status Pesanan:</p>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {statusOptions.map((status) => (
                      <button
                        key={status}
                        onClick={() => handleStatusUpdate(status)}
                        className={`px-3 py-2 rounded font-medium text-sm transition-colors ${
                          selectedStatus === status
                            ? 'bg-blue-600 text-white'
                            : 'bg-white border border-gray-200 text-gray-700 hover:border-blue-300'
                        }`}
                      >
                        {status}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Tanggal Pesanan</p>
                  <p className="text-base font-medium text-gray-800">{order.date} {order.time}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Status Pembayaran</p>
                  <p className="text-base font-medium text-green-600">{order.paymentStatus}</p>
                </div>
              </div>
            </div>

            {/* Order Timeline */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-lg font-bold text-gray-800 mb-6">Timeline Pesanan</h2>
              <div className="space-y-4">
                {order.timeline.map((step, index) => (
                  <div key={index} className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center text-lg ${
                          step.completed
                            ? 'bg-green-100 text-green-600'
                            : 'bg-gray-100 text-gray-400'
                        }`}
                      >
                        {step.icon}
                      </div>
                      {index !== order.timeline.length - 1 && (
                        <div
                          className={`w-1 h-12 mt-2 ${
                            step.completed ? 'bg-green-200' : 'bg-gray-200'
                          }`}
                        />
                      )}
                    </div>
                    <div className="pt-2 pb-4">
                      <p className="font-medium text-gray-800">{step.status}</p>
                      {step.date !== '-' && (
                        <p className="text-sm text-gray-600">
                          {step.date} • {step.time}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Order Items */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-lg font-bold text-gray-800 mb-4">Item Pesanan</h2>
              <div className="space-y-3">
                {order.items.map((item) => (
                  <div key={item.id} className="flex items-start gap-4 pb-3 border-b border-gray-100 last:border-0 last:pb-0">
                    <div className="text-3xl">{item.image}</div>
                    <div className="flex-1">
                      <p className="font-medium text-gray-800">{item.name}</p>
                      <p className="text-sm text-gray-600">{item.category}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-gray-800">
                        {item.quantity} x Rp {item.price.toLocaleString('id-ID')}
                      </p>
                      <p className="text-base font-bold text-gray-800">
                        Rp {item.subtotal.toLocaleString('id-ID')}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Special Notes */}
            {order.notes && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                <h3 className="font-medium text-blue-900 mb-2">Catatan Khusus</h3>
                <p className="text-blue-800">{order.notes}</p>
              </div>
            )}
          </div>

          {/* Right Column - Customer & Shipping Info */}
          <div className="space-y-6">
            {/* Customer Info */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-lg font-bold text-gray-800 mb-4">Informasi Pelanggan</h2>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Nama Lengkap</p>
                  <p className="font-medium text-gray-800">{order.customer.name}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1 flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    Email
                  </p>
                  <p className="font-medium text-gray-800 break-all">{order.customer.email}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1 flex items-center gap-2">
                    <Phone className="w-4 h-4" />
                    Telepon
                  </p>
                  <p className="font-medium text-gray-800">{order.customer.phone}</p>
                </div>
              </div>
            </div>

            {/* Shipping Address */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                <MapPin className="w-5 h-5 text-blue-600" />
                Alamat Pengiriman
              </h2>
              <p className="text-gray-800 font-medium mb-2">{order.customer.name}</p>
              <p className="text-gray-700 text-sm">{order.customer.address}</p>
              <p className="text-gray-700 text-sm">
                {order.customer.city}, {order.customer.province} {order.customer.zipCode}
              </p>
            </div>

            {/* Shipping Info */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                <Truck className="w-5 h-5 text-blue-600" />
                Informasi Pengiriman
              </h2>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Kurir Pengiriman</p>
                  <p className="font-medium text-gray-800">{order.shipping.provider}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Nomor Resi</p>
                  <p className="font-medium text-gray-800">{order.shipping.trackingNumber}</p>
                  <button className="text-xs text-blue-600 hover:text-blue-700 mt-2 font-medium">
                    Lacak Pengiriman →
                  </button>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Estimasi Tiba</p>
                  <p className="font-medium text-gray-800">{order.shipping.estimatedDate}</p>
                </div>
              </div>
            </div>

            {/* Payment Info */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-blue-600" />
                Ringkasan Pembayaran
              </h2>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium text-gray-800">Rp {order.totalPrice.toLocaleString('id-ID')}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Diskon</span>
                  <span className="font-medium text-green-600">-Rp {order.discountAmount.toLocaleString('id-ID')}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Ongkir</span>
                  <span className="font-medium text-gray-800">Rp {order.shippingCost.toLocaleString('id-ID')}</span>
                </div>
                <div className="border-t border-gray-200 pt-3">
                  <div className="flex justify-between">
                    <span className="font-bold text-gray-800">Total</span>
                    <span className="text-lg font-bold text-blue-600">Rp {order.finalPrice.toLocaleString('id-ID')}</span>
                  </div>
                </div>
                <div className="mt-3 pt-3 border-t border-gray-200">
                  <p className="text-sm text-gray-600">Metode Pembayaran</p>
                  <p className="font-medium text-gray-800">{order.paymentMethod}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
