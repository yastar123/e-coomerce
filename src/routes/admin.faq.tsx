import { createFileRoute } from '@tanstack/react-router';

import { useState } from 'react';
import { X, Plus, Edit2, Trash2, Search, ChevronDown } from 'lucide-react';

interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: string;
}

function FAQManagement() {
  const [faqs, setFaqs] = useState<FAQ[]>([
    {
      id: '1',
      question: 'Bagaimana cara melakukan pembelian di Marketplace?',
      answer: 'Caranya sangat mudah! Cukup browse produk yang Anda inginkan, pilih jumlah, dan klik tombol "Beli" atau "Keranjang". Kemudian lanjutkan ke checkout dan selesaikan pembayaran. Pesanan Anda akan segera diproses.',
      category: 'Pembelian'
    },
    {
      id: '2',
      question: 'Berapa lama waktu pengiriman?',
      answer: 'Waktu pengiriman tergantung pada lokasi Anda. Untuk wilayah Jabodetabek, pengiriman biasanya memakan waktu 1-2 hari kerja. Untuk wilayah lainnya, memakan waktu 2-5 hari kerja.',
      category: 'Pengiriman'
    },
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Partial<FAQ>>({
    question: '',
    answer: '',
    category: 'Pembelian'
  });
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const categories = Array.from(new Set(faqs.map(faq => faq.category)));
  const allCategories = ['Pembelian', 'Pengiriman', 'Promosi', 'Pembayaran', 'Pengembalian', 'Pemesanan'];

  // Filter FAQs
  const filteredFaqs = faqs.filter(faq => {
    const matchesSearch = faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         faq.answer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || faq.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Add or Update FAQ
  const handleSave = () => {
    if (!formData.question || !formData.answer || !formData.category) {
      alert('Semua field harus diisi');
      return;
    }

    if (editingId) {
      setFaqs(faqs.map(faq => 
        faq.id === editingId 
          ? { ...faq, ...formData as FAQ }
          : faq
      ));
      setEditingId(null);
    } else {
      const newId = Math.max(...faqs.map(f => parseInt(f.id)), 0) + 1;
      setFaqs([...faqs, {
        id: newId.toString(),
        question: formData.question!,
        answer: formData.answer!,
        category: formData.category!
      }]);
    }

    setFormData({ question: '', answer: '', category: 'Pembelian' });
    setIsAddModalOpen(false);
  };

  // Edit FAQ
  const handleEdit = (faq: FAQ) => {
    setFormData(faq);
    setEditingId(faq.id);
    setIsAddModalOpen(true);
    setExpandedId(null);
  };

  // Delete FAQ
  const handleDelete = (id: string) => {
    if (confirm('Apakah Anda yakin ingin menghapus FAQ ini?')) {
      setFaqs(faqs.filter(faq => faq.id !== id));
      setExpandedId(null);
    }
  };

  // Close modal
  const handleCloseModal = () => {
    setIsAddModalOpen(false);
    setEditingId(null);
    setFormData({ question: '', answer: '', category: 'Pembelian' });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">FAQ Management</h1>
          <p className="text-gray-600 mt-1">Kelola pertanyaan yang sering diajukan</p>
        </div>
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-5 h-5" />
          Tambah FAQ
        </button>
      </div>

      {/* Search and Filter */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Cari FAQ..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {/* Category Filter */}
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="all">Semua Kategori</option>
          {allCategories.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>

      {/* FAQ List */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="p-4 md:p-6">
          {filteredFaqs.length > 0 ? (
            <div className="space-y-3">
              {filteredFaqs.map((faq) => (
                <div
                  key={faq.id}
                  className="border border-gray-200 rounded-lg overflow-hidden"
                >
                  {/* Question Header */}
                  <button
                    onClick={() => setExpandedId(expandedId === faq.id ? null : faq.id)}
                    className="w-full px-4 py-4 flex items-center justify-between bg-gray-50 hover:bg-gray-100 transition-colors"
                  >
                    <div className="flex items-center gap-4 flex-1 text-left">
                      <div className="flex-1">
                        <p className="font-medium text-gray-800 text-sm md:text-base">{faq.question}</p>
                        <span className="inline-block mt-2 px-2 py-1 text-xs font-medium bg-blue-100 text-blue-700 rounded">
                          {faq.category}
                        </span>
                      </div>
                    </div>
                    <ChevronDown
                      className={`w-5 h-5 text-gray-600 flex-shrink-0 transition-transform ${
                        expandedId === faq.id ? 'rotate-180' : ''
                      }`}
                    />
                  </button>

                  {/* Expanded Content */}
                  {expandedId === faq.id && (
                    <div className="px-4 py-4 bg-white border-t border-gray-200 space-y-4">
                      <div>
                        <p className="text-sm font-medium text-gray-600 mb-2">Jawaban:</p>
                        <p className="text-gray-700 text-sm leading-relaxed">{faq.answer}</p>
                      </div>
                      <div className="flex gap-2 justify-end">
                        <button
                          onClick={() => handleEdit(faq)}
                          className="flex items-center gap-2 px-3 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors text-sm"
                        >
                          <Edit2 className="w-4 h-4" />
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(faq.id)}
                          className="flex items-center gap-2 px-3 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors text-sm"
                        >
                          <Trash2 className="w-4 h-4" />
                          Hapus
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500">Tidak ada FAQ yang ditemukan</p>
            </div>
          )}
        </div>
      </div>

      {/* Add/Edit Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="sticky top-0 flex items-center justify-between p-4 md:p-6 border-b border-gray-200 bg-white">
              <h2 className="text-xl font-bold text-gray-800">
                {editingId ? 'Edit FAQ' : 'Tambah FAQ Baru'}
              </h2>
              <button
                onClick={handleCloseModal}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-4 md:p-6 space-y-4">
              {/* Question */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Pertanyaan
                </label>
                <input
                  type="text"
                  value={formData.question || ''}
                  onChange={(e) => setFormData({ ...formData, question: e.target.value })}
                  placeholder="Masukkan pertanyaan..."
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* Answer */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Jawaban
                </label>
                <textarea
                  value={formData.answer || ''}
                  onChange={(e) => setFormData({ ...formData, answer: e.target.value })}
                  placeholder="Masukkan jawaban lengkap..."
                  rows={6}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                />
              </div>

              {/* Category */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Kategori
                </label>
                <select
                  value={formData.category || 'Pembelian'}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {allCategories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="sticky bottom-0 flex gap-2 justify-end p-4 md:p-6 border-t border-gray-200 bg-gray-50">
              <button
                onClick={handleCloseModal}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors"
              >
                Batal
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                {editingId ? 'Update' : 'Tambah'} FAQ
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}


export const Route = createFileRoute('/admin/faq')({ component: FAQManagement });
