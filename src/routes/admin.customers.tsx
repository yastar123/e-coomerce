import { createFileRoute } from '@tanstack/react-router';

import { useState } from 'react';
import { Search, MapPin, Mail, Phone, ShoppingBag, TrendingUp, Filter, Trash2, Edit3, Eye, Plus, X } from 'lucide-react';

interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  joinDate: string;
  totalOrders: number;
  totalSpent: number;
  lastOrder: string;
  status: 'Aktif' | 'Non-Aktif' | 'Suspended';
  tier: 'Silver' | 'Gold' | 'Platinum';
}

function CustomersPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('Semua');
  const [filterTier, setFilterTier] = useState('Semua');
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isAddOpen, setIsAddOpen] = useState(false);

  const customers: Customer[] = [
    {
      id: 'CUST-001',
      name: 'Budi Santoso',
      email: 'budi.santoso@email.com',
      phone: '+62 812-3456-7890',
      address: 'Jl. Merdeka No. 123',
      city: 'Jakarta',
      joinDate: '2023-01-15',
      totalOrders: 24,
      totalSpent: 5400000,
      lastOrder: '2024-07-15',
      status: 'Aktif',
      tier: 'Gold',
    },
    {
      id: 'CUST-002',
      name: 'Siti Nurhaliza',
      email: 'siti.nurhaliza@email.com',
      phone: '+62 812-9876-5432',
      address: 'Jl. Ahmad Yani No. 456',
      city: 'Bandung',
      joinDate: '2023-03-22',
      totalOrders: 18,
      totalSpent: 3200000,
      lastOrder: '2024-07-18',
      status: 'Aktif',
      tier: 'Silver',
    },
    {
      id: 'CUST-003',
      name: 'Ahmad Wijaya',
      email: 'ahmad.wijaya@email.com',
      phone: '+62 812-5555-5555',
      address: 'Jl. Sudirman No. 789',
      city: 'Surabaya',
      joinDate: '2022-06-10',
      totalOrders: 52,
      totalSpent: 12800000,
      lastOrder: '2024-07-17',
      status: 'Aktif',
      tier: 'Platinum',
    },
    {
      id: 'CUST-004',
      name: 'Maya Putri',
      email: 'maya.putri@email.com',
      phone: '+62 812-1111-1111',
      address: 'Jl. Gatot Subroto No. 321',
      city: 'Medan',
      joinDate: '2024-02-08',
      totalOrders: 5,
      totalSpent: 950000,
      lastOrder: '2024-07-16',
      status: 'Aktif',
      tier: 'Silver',
    },
    {
      id: 'CUST-005',
      name: 'Rina Dewi',
      email: 'rina.dewi@email.com',
      phone: '+62 812-2222-2222',
      address: 'Jl. Diponegoro No. 654',
      city: 'Yogyakarta',
      joinDate: '2023-11-20',
      totalOrders: 3,
      totalSpent: 680000,
      lastOrder: '2024-06-10',
      status: 'Non-Aktif',
      tier: 'Silver',
    },
    {
      id: 'CUST-006',
      name: 'Hendra Kusuma',
      email: 'hendra.kusuma@email.com',
      phone: '+62 812-3333-3333',
      address: 'Jl. Pendidikan No. 987',
      city: 'Jakarta',
      joinDate: '2023-05-15',
      totalOrders: 35,
      totalSpent: 8500000,
      lastOrder: '2024-07-18',
      status: 'Aktif',
      tier: 'Gold',
    },
  ];

  const filteredCustomers = customers.filter(c => {
    const matchesSearch = c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         c.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         c.phone.includes(searchTerm);
    const matchesStatus = filterStatus === 'Semua' || c.status === filterStatus;
    const matchesTier = filterTier === 'Semua' || c.tier === filterTier;
    return matchesSearch && matchesStatus && matchesTier;
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
      case 'Aktif':
        return 'bg-green-100 text-green-800';
      case 'Non-Aktif':
        return 'bg-gray-100 text-gray-800';
      case 'Suspended':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getTierColor = (tier: string) => {
    switch (tier) {
      case 'Silver':
        return 'bg-gray-100 text-gray-800 border border-gray-300';
      case 'Gold':
        return 'bg-yellow-100 text-yellow-800 border border-yellow-300';
      case 'Platinum':
        return 'bg-purple-100 text-purple-800 border border-purple-300';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handleDelete = (id: string) => {
    if (confirm('Apakah Anda yakin ingin menghapus pelanggan ini?')) {
      alert(`Pelanggan ${id} telah dihapus`);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Manajemen Pelanggan</h1>
        <p className="text-gray-600">Kelola data pelanggan, tier, dan riwayat pesanan</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-white rounded-lg shadow-sm p-6 border-l-4 border-blue-600">
          <p className="text-gray-600 text-sm font-medium mb-1">Total Pelanggan</p>
          <p className="text-3xl font-bold text-gray-900">{customers.length}</p>
          <p className="text-green-600 text-xs mt-2">+5 pelanggan baru bulan ini</p>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6 border-l-4 border-green-600">
          <p className="text-gray-600 text-sm font-medium mb-1">Pelanggan Aktif</p>
          <p className="text-3xl font-bold text-gray-900">{customers.filter(c => c.status === 'Aktif').length}</p>
          <p className="text-green-600 text-xs mt-2">83.3% dari total</p>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6 border-l-4 border-purple-600">
          <p className="text-gray-600 text-sm font-medium mb-1">Pelanggan Premium</p>
          <p className="text-3xl font-bold text-gray-900">2</p>
          <p className="text-purple-600 text-xs mt-2">Platinum: 1, Gold: 1</p>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6 border-l-4 border-orange-600">
          <p className="text-gray-600 text-sm font-medium mb-1">Total Revenue</p>
          <p className="text-3xl font-bold text-gray-900">{formatCurrency(32530000)}</p>
          <p className="text-orange-600 text-xs mt-2">Dari semua pelanggan</p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <h2 className="text-xl font-bold text-gray-900">Daftar Pelanggan</h2>
            <button
              onClick={() => setIsAddOpen(true)}
              className="flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              <Plus className="w-4 h-4" />
              Tambah Pelanggan
            </button>
          </div>
        </div>

        <div className="p-6 border-b border-gray-200 space-y-4">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Cari nama, email, atau nomor telepon..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none text-sm"
              />
            </div>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none text-sm"
            >
              <option>Semua Status</option>
              <option>Aktif</option>
              <option>Non-Aktif</option>
              <option>Suspended</option>
            </select>
            <select
              value={filterTier}
              onChange={(e) => setFilterTier(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none text-sm"
            >
              <option>Semua Tier</option>
              <option>Silver</option>
              <option>Gold</option>
              <option>Platinum</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-900 uppercase">Pelanggan</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-900 uppercase">Email</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-900 uppercase">Kota</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-900 uppercase">Total Pesanan</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-900 uppercase">Total Belanja</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-900 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-900 uppercase">Tier</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-900 uppercase">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {filteredCustomers.length > 0 ? (
                filteredCustomers.map((customer) => (
                  <tr key={customer.id} className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <div>
                        <div className="font-semibold text-gray-900">{customer.name}</div>
                        <div className="text-xs text-gray-500">{customer.id}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">{customer.email}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{customer.city}</td>
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">{customer.totalOrders}</td>
                    <td className="px-6 py-4 text-sm font-semibold text-gray-900">{formatCurrency(customer.totalSpent)}</td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(customer.status)}`}>
                        {customer.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getTierColor(customer.tier)}`}>
                        {customer.tier}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        <button
                          onClick={() => {
                            setSelectedCustomer(customer);
                            setIsDetailOpen(true);
                          }}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          title="Lihat Detail"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => {
                            setSelectedCustomer(customer);
                            setIsEditOpen(true);
                          }}
                          className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                          title="Edit"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(customer.id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          title="Hapus"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={8} className="px-6 py-8 text-center text-gray-500">
                    Tidak ada pelanggan yang ditemukan
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
          <p className="text-sm text-gray-600">
            Menampilkan {filteredCustomers.length} dari {customers.length} pelanggan
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

      {isDetailOpen && selectedCustomer && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200 flex items-center justify-between sticky top-0 bg-white">
              <h3 className="text-2xl font-bold text-gray-900">Detail Pelanggan</h3>
              <button onClick={() => setIsDetailOpen(false)} className="p-1 hover:bg-gray-100 rounded-lg">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-4">Informasi Pribadi</h4>
                  <div className="space-y-3">
                    <div>
                      <p className="text-xs text-gray-500 font-semibold uppercase">Nama</p>
                      <p className="text-gray-900">{selectedCustomer.name}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 font-semibold uppercase">Email</p>
                      <p className="text-gray-900 flex items-center gap-2">
                        <Mail className="w-4 h-4" /> {selectedCustomer.email}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 font-semibold uppercase">Telepon</p>
                      <p className="text-gray-900 flex items-center gap-2">
                        <Phone className="w-4 h-4" /> {selectedCustomer.phone}
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-900 mb-4">Alamat</h4>
                  <div className="space-y-3">
                    <div>
                      <p className="text-xs text-gray-500 font-semibold uppercase">Alamat Lengkap</p>
                      <p className="text-gray-900 flex items-start gap-2">
                        <MapPin className="w-4 h-4 mt-1 flex-shrink-0" /> {selectedCustomer.address}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 font-semibold uppercase">Kota</p>
                      <p className="text-gray-900">{selectedCustomer.city}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-6">
                <h4 className="font-semibold text-gray-900 mb-4">Statistik Pembelian</h4>
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">{selectedCustomer.totalOrders}</div>
                    <p className="text-xs text-gray-600">Total Pesanan</p>
                  </div>
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">{formatCurrency(selectedCustomer.totalSpent)}</div>
                    <p className="text-xs text-gray-600">Total Belanja</p>
                  </div>
                  <div className="text-center p-4 bg-purple-50 rounded-lg">
                    <div className="text-2xl font-bold text-purple-600">{(selectedCustomer.totalSpent / selectedCustomer.totalOrders).toFixed(0)}</div>
                    <p className="text-xs text-gray-600">Rata-rata Order</p>
                  </div>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-6">
                <h4 className="font-semibold text-gray-900 mb-4">Status & Tier</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-gray-500 font-semibold uppercase mb-2">Status</p>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(selectedCustomer.status)}`}>
                      {selectedCustomer.status}
                    </span>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 font-semibold uppercase mb-2">Tier Member</p>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getTierColor(selectedCustomer.tier)}`}>
                      {selectedCustomer.tier}
                    </span>
                  </div>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-6">
                <p className="text-xs text-gray-500 font-semibold uppercase mb-2">Tanggal</p>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-600">Bergabung:</span>
                    <p className="text-gray-900 font-medium">{selectedCustomer.joinDate}</p>
                  </div>
                  <div>
                    <span className="text-gray-600">Pesanan Terakhir:</span>
                    <p className="text-gray-900 font-medium">{selectedCustomer.lastOrder}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 border-t border-gray-200 flex gap-3 sticky bottom-0 bg-white">
              <button onClick={() => setIsDetailOpen(false)} className="flex-1 px-4 py-2 border border-gray-300 text-gray-900 rounded-lg hover:bg-gray-50 transition-colors font-medium">
                Tutup
              </button>
              <button
                onClick={() => {
                  setIsDetailOpen(false);
                  setIsEditOpen(true);
                }}
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center justify-center gap-2"
              >
                <Edit3 className="w-4 h-4" /> Edit
              </button>
            </div>
          </div>
        </div>
      )}

      {isEditOpen && selectedCustomer && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full">
            <div className="p-6 border-b border-gray-200 flex items-center justify-between">
              <h3 className="text-2xl font-bold text-gray-900">Edit Pelanggan</h3>
              <button onClick={() => setIsEditOpen(false)} className="p-1 hover:bg-gray-100 rounded-lg">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">Nama Lengkap</label>
                <input
                  type="text"
                  defaultValue={selectedCustomer.name}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">Email</label>
                  <input
                    type="email"
                    defaultValue={selectedCustomer.email}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">Telepon</label>
                  <input
                    type="tel"
                    defaultValue={selectedCustomer.phone}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">Alamat</label>
                <input
                  type="text"
                  defaultValue={selectedCustomer.address}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">Status</label>
                  <select
                    defaultValue={selectedCustomer.status}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none"
                  >
                    <option>Aktif</option>
                    <option>Non-Aktif</option>
                    <option>Suspended</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">Tier Member</label>
                  <select
                    defaultValue={selectedCustomer.tier}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none"
                  >
                    <option>Silver</option>
                    <option>Gold</option>
                    <option>Platinum</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="p-6 border-t border-gray-200 flex gap-3">
              <button onClick={() => setIsEditOpen(false)} className="flex-1 px-4 py-2 border border-gray-300 text-gray-900 rounded-lg hover:bg-gray-50 transition-colors font-medium">
                Batal
              </button>
              <button onClick={() => { setIsEditOpen(false); alert('Data pelanggan berhasil diperbarui'); }} className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium">
                Simpan Perubahan
              </button>
            </div>
          </div>
        </div>
      )}

      {isAddOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full">
            <div className="p-6 border-b border-gray-200 flex items-center justify-between">
              <h3 className="text-2xl font-bold text-gray-900">Tambah Pelanggan Baru</h3>
              <button onClick={() => setIsAddOpen(false)} className="p-1 hover:bg-gray-100 rounded-lg">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">Nama Lengkap</label>
                <input
                  type="text"
                  placeholder="Masukkan nama pelanggan"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">Email</label>
                  <input
                    type="email"
                    placeholder="email@example.com"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">Telepon</label>
                  <input
                    type="tel"
                    placeholder="+62 812-XXXX-XXXX"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">Alamat</label>
                <input
                  type="text"
                  placeholder="Alamat lengkap"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">Kota</label>
                <input
                  type="text"
                  placeholder="Kota"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">Status</label>
                  <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none">
                    <option>Aktif</option>
                    <option>Non-Aktif</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">Tier Member</label>
                  <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none">
                    <option>Silver</option>
                    <option>Gold</option>
                    <option>Platinum</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="p-6 border-t border-gray-200 flex gap-3">
              <button onClick={() => setIsAddOpen(false)} className="flex-1 px-4 py-2 border border-gray-300 text-gray-900 rounded-lg hover:bg-gray-50 transition-colors font-medium">
                Batal
              </button>
              <button onClick={() => { setIsAddOpen(false); alert('Pelanggan baru berhasil ditambahkan'); }} className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium">
                Tambah Pelanggan
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}


export const Route = createFileRoute('/admin/customers')({ component: CustomersPage });
