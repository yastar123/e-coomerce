import { createFileRoute } from '@tanstack/react-router';

import { useState } from 'react';
import { Search, Plus, Edit2, Trash2, Eye, X, Mail, Phone, Calendar, ChevronDown, Shield, Ban } from 'lucide-react';

interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  joinDate: string;
  totalOrders: number;
  totalSpent: number;
  status: 'active' | 'inactive' | 'suspended';
  role: 'customer' | 'seller' | 'admin';
}

function UsersPage() {
  const [users, setUsers] = useState<User[]>([
    {
      id: '1',
      name: 'Budi Santoso',
      email: 'budi@email.com',
      phone: '08123456789',
      joinDate: '2023-01-15',
      totalOrders: 24,
      totalSpent: 2450000,
      status: 'active',
      role: 'customer',
    },
    {
      id: '2',
      name: 'Siti Nurhaliza',
      email: 'siti@email.com',
      phone: '08234567890',
      joinDate: '2023-02-10',
      totalOrders: 18,
      totalSpent: 1890000,
      status: 'active',
      role: 'customer',
    },
    {
      id: '3',
      name: 'Ahmad Rahman',
      email: 'ahmad@email.com',
      phone: '08345678901',
      joinDate: '2023-03-20',
      totalOrders: 45,
      totalSpent: 5234000,
      status: 'active',
      role: 'seller',
    },
    {
      id: '4',
      name: 'Rina Wijaya',
      email: 'rina@email.com',
      phone: '08456789012',
      joinDate: '2023-04-05',
      totalOrders: 12,
      totalSpent: 980000,
      status: 'inactive',
      role: 'customer',
    },
    {
      id: '5',
      name: 'Doni Prasetyo',
      email: 'doni@email.com',
      phone: '08567890123',
      joinDate: '2023-05-12',
      totalOrders: 0,
      totalSpent: 0,
      status: 'suspended',
      role: 'customer',
    },
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'active' | 'inactive' | 'suspended'>('all');
  const [filterRole, setFilterRole] = useState<'all' | 'customer' | 'seller' | 'admin'>('all');
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState<'add' | 'view' | 'edit'>('add');
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    status: 'active' as 'active' | 'inactive' | 'suspended',
    role: 'customer' as 'customer' | 'seller' | 'admin',
  });

  const filteredUsers = users.filter((u) => {
    const matchesSearch =
      u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || u.status === filterStatus;
    const matchesRole = filterRole === 'all' || u.role === filterRole;
    return matchesSearch && matchesStatus && matchesRole;
  });

  const openAddModal = () => {
    setModalType('add');
    setFormData({
      name: '',
      email: '',
      phone: '',
      status: 'active',
      role: 'customer',
    });
    setShowModal(true);
  };

  const openEditModal = (user: User) => {
    setModalType('edit');
    setSelectedUser(user);
    setFormData({
      name: user.name,
      email: user.email,
      phone: user.phone,
      status: user.status,
      role: user.role,
    });
    setShowModal(true);
  };

  const openViewModal = (user: User) => {
    setModalType('view');
    setSelectedUser(user);
    setShowModal(true);
  };

  const handleSave = () => {
    if (modalType === 'add') {
      const newUser: User = {
        id: String(users.length + 1),
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        joinDate: new Date().toISOString().split('T')[0],
        totalOrders: 0,
        totalSpent: 0,
        status: formData.status,
        role: formData.role,
      };
      setUsers([...users, newUser]);
    } else if (modalType === 'edit' && selectedUser) {
      setUsers(
        users.map((u) =>
          u.id === selectedUser.id
            ? {
                ...u,
                name: formData.name,
                email: formData.email,
                phone: formData.phone,
                status: formData.status,
                role: formData.role,
              }
            : u
        )
      );
    }
    setShowModal(false);
  };

  const handleDelete = (id: string) => {
    if (confirm('Yakin ingin menghapus pengguna ini?')) {
      setUsers(users.filter((u) => u.id !== id));
    }
  };

  const getStatusColor = (status: string) => {
    const colors: Record<string, { bg: string; text: string }> = {
      active: { bg: 'bg-green-100', text: 'text-green-700' },
      inactive: { bg: 'bg-gray-100', text: 'text-gray-700' },
      suspended: { bg: 'bg-red-100', text: 'text-red-700' },
    };
    return colors[status] || colors.inactive;
  };

  const getRoleColor = (role: string) => {
    const colors: Record<string, { bg: string; text: string }> = {
      customer: { bg: 'bg-blue-100', text: 'text-blue-700' },
      seller: { bg: 'bg-purple-100', text: 'text-purple-700' },
      admin: { bg: 'bg-orange-100', text: 'text-orange-700' },
    };
    return colors[role] || colors.customer;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Pengguna</h1>
          <p className="text-gray-500 mt-1">Kelola semua pengguna marketplace</p>
        </div>
        <button
          onClick={openAddModal}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-5 h-5" />
          Tambah Pengguna
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
              placeholder="Cari pengguna..."
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
              <option value="suspended">Suspended</option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
          </div>

          {/* Role Filter */}
          <div className="relative">
            <select
              value={filterRole}
              onChange={(e) => setFilterRole(e.target.value as any)}
              className="appearance-none px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white pr-10"
            >
              <option value="all">Semua Role</option>
              <option value="customer">Pelanggan</option>
              <option value="seller">Penjual</option>
              <option value="admin">Admin</option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700">Pengguna</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700">Email</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700">Role</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700">Pesanan</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700">Total Belanja</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700">Status</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.length > 0 ? (
                filteredUsers.map((user) => (
                  <tr key={user.id} className="border-b border-gray-200 hover:bg-gray-50">
                    <td className="px-6 py-4 font-medium text-gray-900">{user.name}</td>
                    <td className="px-6 py-4 text-gray-700">{user.email}</td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${getRoleColor(
                          user.role
                        ).bg} ${getRoleColor(user.role).text}`}
                      >
                        {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-900 font-semibold">{user.totalOrders}</td>
                    <td className="px-6 py-4 text-gray-900 font-semibold">
                      Rp {user.totalSpent.toLocaleString('id-ID')}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(
                          user.status
                        ).bg} ${getStatusColor(user.status).text}`}
                      >
                        {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => openViewModal(user)}
                          className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                          title="Lihat"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => openEditModal(user)}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          title="Edit"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(user.id)}
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
                    Tidak ada pengguna yang sesuai dengan pencarian
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
                {modalType === 'add' && 'Tambah Pengguna'}
                {modalType === 'edit' && 'Edit Pengguna'}
                {modalType === 'view' && 'Detail Pengguna'}
              </h2>
              <button
                onClick={() => setShowModal(false)}
                className="p-1 hover:bg-gray-100 rounded-lg"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="p-6 space-y-4">
              {modalType === 'view' && selectedUser ? (
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-gray-700">Nama</label>
                    <p className="mt-1 text-gray-900 font-medium">{selectedUser.name}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700">Email</label>
                    <p className="mt-1 text-gray-900">{selectedUser.email}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700">Telepon</label>
                    <p className="mt-1 text-gray-900">{selectedUser.phone}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700">Bergabung Sejak</label>
                    <p className="mt-1 text-gray-900">{selectedUser.joinDate}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700">Role</label>
                    <span
                      className={`mt-1 inline-block px-3 py-1 rounded-full text-sm font-semibold ${getRoleColor(
                        selectedUser.role
                      ).bg} ${getRoleColor(selectedUser.role).text}`}
                    >
                      {selectedUser.role.charAt(0).toUpperCase() + selectedUser.role.slice(1)}
                    </span>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700">Status</label>
                    <span
                      className={`mt-1 inline-block px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(
                        selectedUser.status
                      ).bg} ${getStatusColor(selectedUser.status).text}`}
                    >
                      {selectedUser.status.charAt(0).toUpperCase() + selectedUser.status.slice(1)}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-4 pt-2 border-t border-gray-200">
                    <div>
                      <p className="text-xs text-gray-500">Total Pesanan</p>
                      <p className="text-2xl font-bold text-gray-900">{selectedUser.totalOrders}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Total Belanja</p>
                      <p className="text-lg font-bold text-green-600">
                        Rp {(selectedUser.totalSpent / 1000000).toFixed(1)}M
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Nama</label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Masukkan nama pengguna"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Masukkan email"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Telepon</label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Masukkan nomor telepon"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
                    <select
                      value={formData.role}
                      onChange={(e) => setFormData({ ...formData, role: e.target.value as any })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                    >
                      <option value="customer">Pelanggan</option>
                      <option value="seller">Penjual</option>
                      <option value="admin">Admin</option>
                    </select>
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
                      <option value="suspended">Suspended</option>
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


export const Route = createFileRoute('/admin/users')({ component: UsersPage });
