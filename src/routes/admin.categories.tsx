import { createFileRoute } from '@tanstack/react-router';

import { useState } from 'react';
import { Search, Plus, Edit2, Trash2, Eye, X, Grid2X2 } from 'lucide-react';

interface Category {
  id: string;
  name: string;
  description: string;
  productCount: number;
  status: 'active' | 'inactive';
  createdDate: string;
}

function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([
    {
      id: '1',
      name: 'Cup 220ml',
      description: 'Air mineral Aerova kemasan cup 220ml — praktis untuk acara, kantor, dan sekolah.',
      productCount: 1,
      status: 'active',
      createdDate: '2024-01-10',
    },
    {
      id: '2',
      name: 'Botol 600ml',
      description: 'Air mineral Aerova kemasan botol 600ml — menyegarkan aktivitas harian.',
      productCount: 1,
      status: 'active',
      createdDate: '2024-01-10',
    },
    {
      id: '3',
      name: 'Dus / Karton',
      description: 'Kemasan dus hemat: cup 220ml isi 48 dan botol 600ml isi 24.',
      productCount: 2,
      status: 'active',
      createdDate: '2024-01-10',
    },
  ]);


  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState<'add' | 'edit' | 'view'>('add');
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    status: 'active' as 'active' | 'inactive',
  });

  const filteredCategories = categories.filter((c) =>
    c.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const openAddModal = () => {
    setModalType('add');
    setFormData({ name: '', description: '', status: 'active' });
    setShowModal(true);
  };

  const openEditModal = (category: Category) => {
    setModalType('edit');
    setSelectedCategory(category);
    setFormData({
      name: category.name,
      description: category.description,
      status: category.status,
    });
    setShowModal(true);
  };

  const openViewModal = (category: Category) => {
    setModalType('view');
    setSelectedCategory(category);
    setShowModal(true);
  };

  const handleSave = () => {
    if (modalType === 'add') {
      const newCategory: Category = {
        id: String(categories.length + 1),
        name: formData.name,
        description: formData.description,
        productCount: 0,
        status: formData.status,
        createdDate: new Date().toISOString().split('T')[0],
      };
      setCategories([...categories, newCategory]);
    } else if (modalType === 'edit' && selectedCategory) {
      setCategories(
        categories.map((c) =>
          c.id === selectedCategory.id
            ? {
                ...c,
                name: formData.name,
                description: formData.description,
                status: formData.status,
              }
            : c
        )
      );
    }
    setShowModal(false);
  };

  const handleDelete = (id: string) => {
    if (confirm('Yakin ingin menghapus kategori ini?')) {
      setCategories(categories.filter((c) => c.id !== id));
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Kategori</h1>
          <p className="text-gray-500 mt-1">Kelola kategori produk marketplace Anda</p>
        </div>
        <button
          onClick={openAddModal}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-5 h-5" />
          Tambah Kategori
        </button>
      </div>

      {/* Search */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Cari kategori..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCategories.length > 0 ? (
          filteredCategories.map((category) => (
            <div
              key={category.id}
              className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow"
            >
              {/* Header */}
              <div className={`px-6 py-4 ${category.status === 'active' ? 'bg-blue-50' : 'bg-gray-50'} border-b border-gray-200`}>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3 flex-1">
                    <div
                      className={`p-3 rounded-lg ${
                        category.status === 'active' ? 'bg-blue-100' : 'bg-gray-100'
                      }`}
                    >
                      <Grid2X2
                        className={`w-6 h-6 ${
                          category.status === 'active' ? 'text-blue-600' : 'text-gray-600'
                        }`}
                      />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{category.name}</h3>
                      <p className="text-xs text-gray-500">{category.createdDate}</p>
                    </div>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      category.status === 'active'
                        ? 'bg-green-100 text-green-700'
                        : 'bg-gray-100 text-gray-700'
                    }`}
                  >
                    {category.status === 'active' ? 'Aktif' : 'Non-Aktif'}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="px-6 py-4 space-y-4">
                <div>
                  <p className="text-sm text-gray-600">{category.description}</p>
                </div>
                <div className="flex items-center justify-between pt-2 border-t border-gray-200">
                  <div>
                    <p className="text-xs text-gray-500">Total Produk</p>
                    <p className="text-2xl font-bold text-blue-600">{category.productCount}</p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => openViewModal(category)}
                      className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                      title="Lihat"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => openEditModal(category)}
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                      title="Edit"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(category.id)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      title="Hapus"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center py-12">
            <p className="text-gray-500">Tidak ada kategori yang sesuai dengan pencarian</p>
          </div>
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 px-6 py-4 border-b border-gray-200 flex items-center justify-between bg-white">
              <h2 className="text-xl font-bold text-gray-900">
                {modalType === 'add' && 'Tambah Kategori'}
                {modalType === 'edit' && 'Edit Kategori'}
                {modalType === 'view' && 'Detail Kategori'}
              </h2>
              <button
                onClick={() => setShowModal(false)}
                className="p-1 hover:bg-gray-100 rounded-lg"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="p-6 space-y-4">
              {modalType === 'view' && selectedCategory ? (
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-gray-700">Nama Kategori</label>
                    <p className="mt-1 text-gray-900 font-medium">{selectedCategory.name}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700">Deskripsi</label>
                    <p className="mt-1 text-gray-700">{selectedCategory.description}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700">Total Produk</label>
                    <p className="mt-1 text-gray-900 font-semibold">{selectedCategory.productCount} produk</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700">Status</label>
                    <span
                      className={`mt-1 inline-block px-3 py-1 rounded-full text-sm font-semibold ${
                        selectedCategory.status === 'active'
                          ? 'bg-green-100 text-green-700'
                          : 'bg-gray-100 text-gray-700'
                      }`}
                    >
                      {selectedCategory.status === 'active' ? 'Aktif' : 'Non-Aktif'}
                    </span>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700">Tanggal Dibuat</label>
                    <p className="mt-1 text-gray-700">{selectedCategory.createdDate}</p>
                  </div>
                </div>
              ) : (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Nama Kategori</label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Masukkan nama kategori"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Deskripsi</label>
                    <textarea
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      rows={4}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Masukkan deskripsi kategori"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                    <select
                      value={formData.status}
                      onChange={(e) => setFormData({ ...formData, status: e.target.value as 'active' | 'inactive' })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                    >
                      <option value="active">Aktif</option>
                      <option value="inactive">Non-Aktif</option>
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


export const Route = createFileRoute('/admin/categories')({ component: CategoriesPage });
