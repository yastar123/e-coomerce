import { createFileRoute } from '@tanstack/react-router';

import { useState } from 'react';
import { Search, Plus, Edit2, Trash2, Eye, X, Calendar, Percent, ChevronDown, Tag } from 'lucide-react';

interface Promotion {
  id: string;
  code: string;
  name: string;
  description: string;
  type: 'percentage' | 'fixed';
  value: number;
  maxDiscount?: number;
  minPurchase: number;
  usedCount: number;
  maxUses?: number;
  status: 'active' | 'inactive' | 'expired';
  startDate: string;
  endDate: string;
}

function PromotionsPage() {
  const [promotions, setPromotions] = useState<Promotion[]>([
    {
      id: '1',
      code: 'SAVE10',
      name: 'Diskon 10%',
      description: 'Dapatkan diskon 10% untuk setiap pembelian',
      type: 'percentage',
      value: 10,
      maxDiscount: 50000,
      minPurchase: 100000,
      usedCount: 245,
      maxUses: 1000,
      status: 'active',
      startDate: '2024-01-01',
      endDate: '2024-12-31',
    },
    {
      id: '2',
      code: 'SAVE20',
      name: 'Diskon 20%',
      description: 'Dapatkan diskon 20% untuk pembelian lebih dari Rp 500.000',
      type: 'percentage',
      value: 20,
      maxDiscount: 100000,
      minPurchase: 500000,
      usedCount: 128,
      maxUses: 500,
      status: 'active',
      startDate: '2024-01-15',
      endDate: '2024-06-30',
    },
    {
      id: '3',
      code: 'FLAT50',
      name: 'Diskon Rp 50.000',
      description: 'Diskon langsung Rp 50.000 untuk pembelian minimal Rp 250.000',
      type: 'fixed',
      value: 50000,
      minPurchase: 250000,
      usedCount: 89,
      status: 'active',
      startDate: '2024-01-10',
      endDate: '2024-02-29',
    },
    {
      id: '4',
      code: 'NEWYEAR',
      name: 'Promo Tahun Baru',
      description: 'Spesial promo tahun baru dengan berbagai penawaran menarik',
      type: 'percentage',
      value: 25,
      maxDiscount: 150000,
      minPurchase: 300000,
      usedCount: 312,
      maxUses: 200,
      status: 'expired',
      startDate: '2024-01-01',
      endDate: '2024-01-07',
    },
    {
      id: '5',
      code: 'WELCOME',
      name: 'Selamat Datang',
      description: 'Khusus pengguna baru - diskon 15%',
      type: 'percentage',
      value: 15,
      minPurchase: 0,
      usedCount: 567,
      status: 'inactive',
      startDate: '2024-01-01',
      endDate: '2024-12-31',
    },
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'active' | 'inactive' | 'expired'>('all');
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState<'add' | 'edit' | 'view'>('add');
  const [selectedPromotion, setSelectedPromotion] = useState<Promotion | null>(null);
  const [formData, setFormData] = useState({
    code: '',
    name: '',
    description: '',
    type: 'percentage' as 'percentage' | 'fixed',
    value: '',
    maxDiscount: '',
    minPurchase: '',
    maxUses: '',
    status: 'active' as 'active' | 'inactive' | 'expired',
    startDate: '',
    endDate: '',
  });

  const filteredPromotions = promotions.filter((p) => {
    const matchesSearch =
      p.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || p.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const openAddModal = () => {
    setModalType('add');
    setFormData({
      code: '',
      name: '',
      description: '',
      type: 'percentage',
      value: '',
      maxDiscount: '',
      minPurchase: '',
      maxUses: '',
      status: 'active',
      startDate: '',
      endDate: '',
    });
    setShowModal(true);
  };

  const openEditModal = (promo: Promotion) => {
    setModalType('edit');
    setSelectedPromotion(promo);
    setFormData({
      code: promo.code,
      name: promo.name,
      description: promo.description,
      type: promo.type,
      value: String(promo.value),
      maxDiscount: String(promo.maxDiscount || ''),
      minPurchase: String(promo.minPurchase),
      maxUses: String(promo.maxUses || ''),
      status: promo.status,
      startDate: promo.startDate,
      endDate: promo.endDate,
    });
    setShowModal(true);
  };

  const openViewModal = (promo: Promotion) => {
    setModalType('view');
    setSelectedPromotion(promo);
    setShowModal(true);
  };

  const handleSave = () => {
    if (modalType === 'add') {
      const newPromo: Promotion = {
        id: String(promotions.length + 1),
        code: formData.code,
        name: formData.name,
        description: formData.description,
        type: formData.type,
        value: Number(formData.value),
        maxDiscount: formData.maxDiscount ? Number(formData.maxDiscount) : undefined,
        minPurchase: Number(formData.minPurchase),
        usedCount: 0,
        maxUses: formData.maxUses ? Number(formData.maxUses) : undefined,
        status: formData.status,
        startDate: formData.startDate,
        endDate: formData.endDate,
      };
      setPromotions([...promotions, newPromo]);
    } else if (modalType === 'edit' && selectedPromotion) {
      setPromotions(
        promotions.map((p) =>
          p.id === selectedPromotion.id
            ? {
                ...p,
                code: formData.code,
                name: formData.name,
                description: formData.description,
                type: formData.type,
                value: Number(formData.value),
                maxDiscount: formData.maxDiscount ? Number(formData.maxDiscount) : undefined,
                minPurchase: Number(formData.minPurchase),
                maxUses: formData.maxUses ? Number(formData.maxUses) : undefined,
                status: formData.status,
                startDate: formData.startDate,
                endDate: formData.endDate,
              }
            : p
        )
      );
    }
    setShowModal(false);
  };

  const handleDelete = (id: string) => {
    if (confirm('Yakin ingin menghapus promosi ini?')) {
      setPromotions(promotions.filter((p) => p.id !== id));
    }
  };

  const getStatusColor = (status: string) => {
    const colors: Record<string, { bg: string; text: string }> = {
      active: { bg: 'bg-green-100', text: 'text-green-700' },
      inactive: { bg: 'bg-gray-100', text: 'text-gray-700' },
      expired: { bg: 'bg-red-100', text: 'text-red-700' },
    };
    return colors[status] || colors.inactive;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Promosi</h1>
          <p className="text-gray-500 mt-1">Kelola promosi dan kode diskon marketplace</p>
        </div>
        <button
          onClick={openAddModal}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-5 h-5" />
          Tambah Promosi
        </button>
      </div>

      {/* Filters & Search */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Cari promosi atau kode..."
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
              <option value="active">Aktif</option>
              <option value="inactive">Non-Aktif</option>
              <option value="expired">Kadaluarsa</option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Promotions Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPromotions.length > 0 ? (
          filteredPromotions.map((promo) => (
            <div
              key={promo.id}
              className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg shadow-sm border border-blue-200 overflow-hidden hover:shadow-md transition-shadow"
            >
              {/* Header */}
              <div className="px-6 py-4 bg-blue-600 text-white flex items-start justify-between">
                <div className="flex items-center gap-2">
                  <Tag className="w-5 h-5" />
                  <div>
                    <h3 className="font-bold text-lg">{promo.code}</h3>
                    <p className="text-xs text-blue-100">{promo.name}</p>
                  </div>
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(
                    promo.status
                  ).bg} ${getStatusColor(promo.status).text}`}
                >
                  {promo.status.charAt(0).toUpperCase() + promo.status.slice(1)}
                </span>
              </div>

              {/* Content */}
              <div className="px-6 py-4 space-y-4">
                <div>
                  <p className="text-sm text-gray-700">{promo.description}</p>
                </div>

                {/* Discount Value */}
                <div className="bg-white rounded-lg p-3 text-center">
                  <div className="flex items-center justify-center gap-2">
                    <Percent className="w-5 h-5 text-blue-600" />
                    <span className="text-2xl font-bold text-blue-600">
                      {promo.type === 'percentage' ? `${promo.value}%` : `Rp ${promo.value.toLocaleString('id-ID')}`}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    Min. Pembelian: Rp {promo.minPurchase.toLocaleString('id-ID')}
                  </p>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div className="bg-white rounded p-2 text-center">
                    <p className="text-gray-500 text-xs">Digunakan</p>
                    <p className="font-bold text-gray-900">{promo.usedCount}</p>
                    {promo.maxUses && <p className="text-xs text-gray-500">dari {promo.maxUses}</p>}
                  </div>
                  <div className="bg-white rounded p-2 text-center">
                    <Calendar className="w-4 h-4 text-gray-400 mx-auto mb-1" />
                    <p className="text-xs text-gray-600">
                      {promo.startDate} - {promo.endDate}
                    </p>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2 pt-2 border-t border-blue-200">
                  <button
                    onClick={() => openViewModal(promo)}
                    className="flex-1 p-2 text-gray-600 hover:bg-white rounded-lg transition-colors text-sm font-medium flex items-center justify-center gap-1"
                    title="Lihat"
                  >
                    <Eye className="w-4 h-4" />
                    <span className="hidden sm:inline">Lihat</span>
                  </button>
                  <button
                    onClick={() => openEditModal(promo)}
                    className="flex-1 p-2 text-blue-600 hover:bg-white rounded-lg transition-colors text-sm font-medium flex items-center justify-center gap-1"
                    title="Edit"
                  >
                    <Edit2 className="w-4 h-4" />
                    <span className="hidden sm:inline">Edit</span>
                  </button>
                  <button
                    onClick={() => handleDelete(promo.id)}
                    className="flex-1 p-2 text-red-600 hover:bg-white rounded-lg transition-colors text-sm font-medium flex items-center justify-center gap-1"
                    title="Hapus"
                  >
                    <Trash2 className="w-4 h-4" />
                    <span className="hidden sm:inline">Hapus</span>
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center py-12">
            <p className="text-gray-500">Tidak ada promosi yang sesuai dengan pencarian</p>
          </div>
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 px-6 py-4 border-b border-gray-200 flex items-center justify-between bg-white">
              <h2 className="text-xl font-bold text-gray-900">
                {modalType === 'add' && 'Tambah Promosi'}
                {modalType === 'edit' && 'Edit Promosi'}
                {modalType === 'view' && 'Detail Promosi'}
              </h2>
              <button
                onClick={() => setShowModal(false)}
                className="p-1 hover:bg-gray-100 rounded-lg"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="p-6 space-y-4">
              {modalType === 'view' && selectedPromotion ? (
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-gray-700">Kode Promosi</label>
                    <p className="mt-1 text-gray-900 font-mono text-lg font-bold">{selectedPromotion.code}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700">Nama</label>
                    <p className="mt-1 text-gray-900 font-medium">{selectedPromotion.name}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700">Deskripsi</label>
                    <p className="mt-1 text-gray-700">{selectedPromotion.description}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-gray-700">Tipe Diskon</label>
                      <p className="mt-1 text-gray-900 capitalize">{selectedPromotion.type === 'percentage' ? 'Persentase' : 'Jumlah Tetap'}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700">Nilai Diskon</label>
                      <p className="mt-1 text-gray-900 font-bold">
                        {selectedPromotion.type === 'percentage' ? `${selectedPromotion.value}%` : `Rp ${selectedPromotion.value.toLocaleString('id-ID')}`}
                      </p>
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700">Minimum Pembelian</label>
                    <p className="mt-1 text-gray-900">Rp {selectedPromotion.minPurchase.toLocaleString('id-ID')}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-gray-700">Tanggal Mulai</label>
                      <p className="mt-1 text-gray-900">{selectedPromotion.startDate}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700">Tanggal Berakhir</label>
                      <p className="mt-1 text-gray-900">{selectedPromotion.endDate}</p>
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700">Status</label>
                    <span
                      className={`mt-1 inline-block px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(
                        selectedPromotion.status
                      ).bg} ${getStatusColor(selectedPromotion.status).text}`}
                    >
                      {selectedPromotion.status.charAt(0).toUpperCase() + selectedPromotion.status.slice(1)}
                    </span>
                  </div>
                </div>
              ) : (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Kode Promosi</label>
                    <input
                      type="text"
                      value={formData.code}
                      onChange={(e) => setFormData({ ...formData, code: e.target.value.toUpperCase() })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono"
                      placeholder="Contoh: SAVE10"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Nama Promosi</label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Contoh: Diskon 10%"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Deskripsi</label>
                    <textarea
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      rows={3}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Deskripsi promosi"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Tipe Diskon</label>
                      <select
                        value={formData.type}
                        onChange={(e) => setFormData({ ...formData, type: e.target.value as any })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                      >
                        <option value="percentage">Persentase (%)</option>
                        <option value="fixed">Jumlah Tetap (Rp)</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Nilai Diskon</label>
                      <input
                        type="number"
                        value={formData.value}
                        onChange={(e) => setFormData({ ...formData, value: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Nilai"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Minimum Pembelian (Rp)</label>
                    <input
                      type="number"
                      value={formData.minPurchase}
                      onChange={(e) => setFormData({ ...formData, minPurchase: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Contoh: 100000"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Max Diskon (Rp)</label>
                    <input
                      type="number"
                      value={formData.maxDiscount}
                      onChange={(e) => setFormData({ ...formData, maxDiscount: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Opsional"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Max Penggunaan</label>
                    <input
                      type="number"
                      value={formData.maxUses}
                      onChange={(e) => setFormData({ ...formData, maxUses: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Opsional"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Tanggal Mulai</label>
                      <input
                        type="date"
                        value={formData.startDate}
                        onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Tanggal Berakhir</label>
                      <input
                        type="date"
                        value={formData.endDate}
                        onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                    <select
                      value={formData.status}
                      onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                    >
                      <option value="active">Aktif</option>
                      <option value="inactive">Non-Aktif</option>
                      <option value="expired">Kadaluarsa</option>
                    </select>
                  </div>
                </>
              )}
            </div>

            <div className="px-6 py-4 border-t border-gray-200 flex gap-3 justify-end">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Batal
              </button>
              {modalType !== 'view' && (
                <button
                  onClick={handleSave}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Simpan
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}


export const Route = createFileRoute('/admin/promotions')({ component: PromotionsPage });
