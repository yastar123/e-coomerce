import { createFileRoute } from '@tanstack/react-router';

import { useState } from 'react';
import { Search, Download, TrendingUp, CreditCard, DollarSign, PieChart, Calendar, Filter, Eye, CheckCircle, Clock, XCircle } from 'lucide-react';

function PaymentsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('Semua');
  const [dateRange, setDateRange] = useState('bulan');

  const financialMetrics = {
    totalRevenue: 45250000,
    totalTransactions: 1234,
    averageTransaction: 36700,
    successRate: 98.5,
    pendingAmount: 2500000,
    failedAmount: 450000,
  };

  const paymentMethods = [
    { name: 'Kartu Kredit', amount: 18500000, percentage: 40.9, color: 'bg-blue-500', count: 520 },
    { name: 'Transfer Bank', amount: 14250000, percentage: 31.5, color: 'bg-green-500', count: 380 },
    { name: 'E-Wallet', amount: 9500000, percentage: 21.0, color: 'bg-purple-500', count: 250 },
    { name: 'Cicilan', amount: 3000000, percentage: 6.6, color: 'bg-orange-500', count: 84 },
  ];

  const recentTransactions = [
    {
      id: 'TRX-2024-001',
      orderId: '#ORD-001',
      customer: 'Budi Santoso',
      amount: 450000,
      method: 'Kartu Kredit',
      status: 'Sukses',
      date: '2024-07-18 14:30:00',
    },
    {
      id: 'TRX-2024-002',
      orderId: '#ORD-002',
      customer: 'Siti Nurhaliza',
      amount: 350000,
      method: 'Transfer Bank',
      status: 'Sukses',
      date: '2024-07-18 13:15:00',
    },
    {
      id: 'TRX-2024-003',
      orderId: '#ORD-003',
      customer: 'Ahmad Wijaya',
      amount: 750000,
      method: 'E-Wallet',
      status: 'Pending',
      date: '2024-07-18 12:45:00',
    },
    {
      id: 'TRX-2024-004',
      orderId: '#ORD-004',
      customer: 'Maya Putri',
      amount: 525000,
      method: 'Cicilan',
      status: 'Sukses',
      date: '2024-07-18 11:20:00',
    },
    {
      id: 'TRX-2024-005',
      orderId: '#ORD-005',
      customer: 'Rina Dewi',
      amount: 280000,
      method: 'Kartu Kredit',
      status: 'Gagal',
      date: '2024-07-18 10:05:00',
    },
  ];

  const filteredTransactions = recentTransactions.filter(t => {
    const matchesSearch = t.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         t.customer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'Semua' || t.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Sukses':
        return 'bg-green-100 text-green-800';
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'Gagal':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Sukses':
        return <CheckCircle className="w-4 h-4" />;
      case 'Pending':
        return <Clock className="w-4 h-4" />;
      case 'Gagal':
        return <XCircle className="w-4 h-4" />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Pembayaran & Keuangan</h1>
        <p className="text-gray-600">Kelola transaksi, laporan keuangan, dan analisis revenue</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-white rounded-lg shadow-sm p-6 border-l-4 border-blue-600">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium mb-1">Total Revenue</p>
              <p className="text-2xl font-bold text-gray-900">{formatCurrency(financialMetrics.totalRevenue)}</p>
              <p className="text-green-600 text-xs mt-2 flex items-center gap-1">
                <TrendingUp className="w-3 h-3" /> +12.5% dari bulan lalu
              </p>
            </div>
            <DollarSign className="w-8 h-8 text-blue-600 opacity-20" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6 border-l-4 border-green-600">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium mb-1">Total Transaksi</p>
              <p className="text-2xl font-bold text-gray-900">{financialMetrics.totalTransactions.toLocaleString()}</p>
              <p className="text-green-600 text-xs mt-2">Rata-rata: {formatCurrency(financialMetrics.averageTransaction)}</p>
            </div>
            <CreditCard className="w-8 h-8 text-green-600 opacity-20" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6 border-l-4 border-purple-600">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium mb-1">Success Rate</p>
              <p className="text-2xl font-bold text-gray-900">{financialMetrics.successRate}%</p>
              <p className="text-green-600 text-xs mt-2">Berhasil: {(financialMetrics.totalTransactions * 0.985).toFixed(0)}</p>
            </div>
            <CheckCircle className="w-8 h-8 text-purple-600 opacity-20" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6 border-l-4 border-orange-600">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium mb-1">Pending + Gagal</p>
              <p className="text-2xl font-bold text-gray-900">{formatCurrency(financialMetrics.pendingAmount + financialMetrics.failedAmount)}</p>
              <p className="text-orange-600 text-xs mt-2">Perlu penanganan</p>
            </div>
            <Clock className="w-8 h-8 text-orange-600 opacity-20" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        <div className="lg:col-span-2 bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
              <PieChart className="w-5 h-5 text-blue-600" />
              Metode Pembayaran
            </h2>
          </div>

          <div className="space-y-4">
            {paymentMethods.map((method) => (
              <div key={method.name}>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <div className={`${method.color} h-3 w-3 rounded-full`}></div>
                    <span className="text-sm font-medium text-gray-900">{method.name}</span>
                    <span className="text-xs text-gray-500">({method.count} transaksi)</span>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold text-gray-900">{formatCurrency(method.amount)}</p>
                    <p className="text-xs text-gray-500">{method.percentage}%</p>
                  </div>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                  <div className={`${method.color} h-full rounded-full`} style={{ width: `${method.percentage}%` }}></div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 pt-6 border-t border-gray-200">
            <button className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium">
              <Download className="w-4 h-4" />
              Download Laporan Metode Pembayaran
            </button>
          </div>
        </div>

        <div className="space-y-4">
          <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg shadow-sm p-6 text-white">
            <h3 className="font-bold mb-4">Ringkasan Periode</h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="opacity-90">Periode:</span>
                <span className="font-semibold">Juli 2024</span>
              </div>
              <div className="flex justify-between">
                <span className="opacity-90">Hari Aktif:</span>
                <span className="font-semibold">18 hari</span>
              </div>
              <div className="flex justify-between">
                <span className="opacity-90">Rata-rata harian:</span>
                <span className="font-semibold">{formatCurrency(financialMetrics.totalRevenue / 18)}</span>
              </div>
              <div className="flex justify-between border-t border-blue-400 pt-3">
                <span className="opacity-90">Target bulan:</span>
                <span className="font-semibold">Rp 75.000.000</span>
              </div>
              <div className="flex justify-between">
                <span className="opacity-90">Pencapaian:</span>
                <span className="font-semibold">60.3%</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="font-bold mb-4 text-gray-900">Aksi Cepat</h3>
            <div className="space-y-2">
              <button className="w-full px-4 py-2 bg-gray-100 text-gray-900 rounded-lg hover:bg-gray-200 transition-colors text-sm font-medium">
                Ekspor Data CSV
              </button>
              <button className="w-full px-4 py-2 bg-gray-100 text-gray-900 rounded-lg hover:bg-gray-200 transition-colors text-sm font-medium">
                Generate Invoice
              </button>
              <button className="w-full px-4 py-2 bg-gray-100 text-gray-900 rounded-lg hover:bg-gray-200 transition-colors text-sm font-medium">
                Laporan Pajak
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <h2 className="text-xl font-bold text-gray-900">Transaksi Terbaru</h2>
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1 sm:flex-none">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Cari ID transaksi, customer..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full sm:w-64 pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none text-sm"
                />
              </div>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none text-sm"
              >
                <option>Semua</option>
                <option>Sukses</option>
                <option>Pending</option>
                <option>Gagal</option>
              </select>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium flex items-center justify-center gap-2">
                <Download className="w-4 h-4" />
                Export
              </button>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-900 uppercase tracking-wide">ID Transaksi</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-900 uppercase tracking-wide">Customer</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-900 uppercase tracking-wide">Metode</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-900 uppercase tracking-wide">Jumlah</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-900 uppercase tracking-wide">Status</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-900 uppercase tracking-wide">Waktu</th>
              </tr>
            </thead>
            <tbody>
              {filteredTransactions.length > 0 ? (
                filteredTransactions.map((transaction) => (
                  <tr key={transaction.id} className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 text-sm font-medium text-blue-600">{transaction.id}</td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      <div>{transaction.customer}</div>
                      <div className="text-xs text-gray-500">{transaction.orderId}</div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">{transaction.method}</td>
                    <td className="px-6 py-4 text-sm font-semibold text-gray-900">{formatCurrency(transaction.amount)}</td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(transaction.status)}`}>
                        {getStatusIcon(transaction.status)}
                        {transaction.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">{transaction.date}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="px-6 py-8 text-center text-gray-500">
                    Tidak ada transaksi yang ditemukan
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
          <p className="text-sm text-gray-600">
            Menampilkan {filteredTransactions.length} dari {recentTransactions.length} transaksi
          </p>
          <div className="flex gap-2">
            <button className="px-3 py-1 border border-gray-300 rounded-lg text-sm text-gray-700 hover:bg-gray-50 transition-colors">
              Sebelumnya
            </button>
            <button className="px-3 py-1 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700 transition-colors">
              1
            </button>
            <button className="px-3 py-1 border border-gray-300 rounded-lg text-sm text-gray-700 hover:bg-gray-50 transition-colors">
              2
            </button>
            <button className="px-3 py-1 border border-gray-300 rounded-lg text-sm text-gray-700 hover:bg-gray-50 transition-colors">
              Selanjutnya
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}


export const Route = createFileRoute('/admin/payments')({ component: PaymentsPage });
