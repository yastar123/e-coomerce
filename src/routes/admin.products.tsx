import { createFileRoute } from '@tanstack/react-router';

import { useState } from 'react';
import { Search, Plus, Edit2, Trash2, Eye, ChevronDown, X } from 'lucide-react';
import { products as aerovaProducts, categories as aerovaCategories } from '@/lib/products';

interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  image: string;
  stock: number;
  status: 'active' | 'inactive';
  sales: number;
}

// Deterministic pseudo-stock/sales based on price so numbers stay stable per render
const deriveStock = (p: { price: number }) => Math.max(40, 300 - Math.round(p.price / 500));
const deriveSales = (p: { price: number; badge?: string }) =>
  (p.badge === 'Best Seller' ? 480 : p.badge === 'Hemat' ? 356 : p.badge === 'Baru' ? 142 : 210);

function ProductsPage() {
  const [products, setProducts] = useState<Product[]>(
    aerovaProducts.map((p) => ({
      id: p.id,
      name: p.name,
      category: p.category,
      price: p.price,
      image: p.image,
      stock: deriveStock(p),
      status: p.inStock ? 'active' : 'inactive',
      sales: deriveSales(p),
    }))
  );

  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'active' | 'inactive'>('all');
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState<'add' | 'edit' | 'view'>('add');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    price: '',
    stock: '',
    status: 'active' as 'active' | 'inactive',
  });


  const filteredProducts = products.filter((p) => {
    const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || p.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const openAddModal = () => {
    setModalType('add');
    setFormData({ name: '', category: '', price: '', stock: '', status: 'active' });
    setShowModal(true);
  };

  const openEditModal = (product: Product) => {
    setModalType('edit');
    setSelectedProduct(product);
    setFormData({
      name: product.name,
      category: product.category,
      price: String(product.price),
      stock: String(product.stock),
      status: product.status,
    });
    setShowModal(true);
  };

  const openViewModal = (product: Product) => {
    setModalType('view');
    setSelectedProduct(product);
    setShowModal(true);
  };

  const handleSave = () => {
    if (modalType === 'add') {
      const newProduct: Product = {
        id: String(products.length + 1),
        name: formData.name,
        category: formData.category,
        price: Number(formData.price),
        image: '',
        stock: Number(formData.stock),
        status: formData.status,
        sales: 0,
      };
      setProducts([...products, newProduct]);

    } else if (modalType === 'edit' && selectedProduct) {
      setProducts(
        products.map((p) =>
          p.id === selectedProduct.id
            ? {
                ...p,
                name: formData.name,
                category: formData.category,
                price: Number(formData.price),
                stock: Number(formData.stock),
                status: formData.status,
              }
            : p
        )
      );
    }
    setShowModal(false);
  };

  const handleDelete = (id: string) => {
    if (confirm('Yakin ingin menghapus produk ini?')) {
      setProducts(products.filter((p) => p.id !== id));
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Produk</h1>
          <p className="text-gray-500 mt-1">Kelola semua produk marketplace Anda</p>
        </div>
        <button
          onClick={openAddModal}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-5 h-5" />
          Tambah Produk
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
              placeholder="Cari produk..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Status Filter */}
          <div className="relative">
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value as 'all' | 'active' | 'inactive')}
              className="appearance-none px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white pr-10"
            >
              <option value="all">Semua Status</option>
              <option value="active">Aktif</option>
              <option value="inactive">Non-Aktif</option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Products Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700">Produk</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700">Kategori</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700">Harga</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700">Stok</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700">Penjualan</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700">Status</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.length > 0 ? (
                filteredProducts.map((product) => (
                  <tr key={product.id} className="border-b border-gray-200 hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        {product.image && (
                          <img src={product.image} alt={product.name} className="w-12 h-12 object-contain rounded-md bg-gray-50 border border-gray-200" />
                        )}
                        <span className="font-medium text-gray-900">{product.name}</span>
                      </div>
                    </td>

                    <td className="px-6 py-4 text-gray-700">{product.category}</td>
                    <td className="px-6 py-4 text-gray-900 font-semibold">Rp {product.price.toLocaleString('id-ID')}</td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium ${
                          product.stock > 50 ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                        }`}
                      >
                        {product.stock} unit
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-900 font-semibold">{product.sales}</td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          product.status === 'active'
                            ? 'bg-green-100 text-green-700'
                            : 'bg-gray-100 text-gray-700'
                        }`}
                      >
                        {product.status === 'active' ? 'Aktif' : 'Non-Aktif'}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => openViewModal(product)}
                          className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                          title="Lihat"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => openEditModal(product)}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          title="Edit"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(product.id)}
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
                  <td colSpan={7} className="px-6 py-12 text-center text-gray-500">
                    Tidak ada produk yang sesuai dengan pencarian
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 px-6 py-4 border-b border-gray-200 flex items-center justify-between bg-white">
              <h2 className="text-xl font-bold text-gray-900">
                {modalType === 'add' && 'Tambah Produk'}
                {modalType === 'edit' && 'Edit Produk'}
                {modalType === 'view' && 'Detail Produk'}
              </h2>
              <button
                onClick={() => setShowModal(false)}
                className="p-1 hover:bg-gray-100 rounded-lg"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="p-6 space-y-4">
              {modalType === 'view' && selectedProduct ? (
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-gray-700">Nama Produk</label>
                    <p className="mt-1 text-gray-900 font-medium">{selectedProduct.name}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700">Kategori</label>
                    <p className="mt-1 text-gray-900">{selectedProduct.category}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700">Harga</label>
                    <p className="mt-1 text-gray-900 font-semibold">Rp {selectedProduct.price.toLocaleString('id-ID')}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700">Stok</label>
                    <p className="mt-1 text-gray-900">{selectedProduct.stock} unit</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700">Total Penjualan</label>
                    <p className="mt-1 text-gray-900">{selectedProduct.sales} unit</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700">Status</label>
                    <span
                      className={`mt-1 inline-block px-3 py-1 rounded-full text-sm font-semibold ${
                        selectedProduct.status === 'active'
                          ? 'bg-green-100 text-green-700'
                          : 'bg-gray-100 text-gray-700'
                      }`}
                    >
                      {selectedProduct.status === 'active' ? 'Aktif' : 'Non-Aktif'}
                    </span>
                  </div>
                </div>
              ) : (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Nama Produk</label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Masukkan nama produk"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Kategori</label>
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                    >
                      <option value="">Pilih Kategori</option>
                      {aerovaCategories.filter((c) => c !== 'All').map((c) => (
                        <option key={c} value={c}>{c}</option>
                      ))}

                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Harga</label>
                    <input
                      type="number"
                      value={formData.price}
                      onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Masukkan harga"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Stok</label>
                    <input
                      type="number"
                      value={formData.stock}
                      onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Masukkan jumlah stok"
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


export const Route = createFileRoute('/admin/products')({ component: ProductsPage });
