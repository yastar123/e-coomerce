import { createFileRoute } from '@tanstack/react-router';
import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Cart from '@/components/Cart';
import { Product } from '@/lib/products';
import { User, Mail, Phone, MapPin, Package, Heart, CreditCard, Settings, LogOut, Edit } from 'lucide-react';

interface CartItem extends Product {
  quantity: number;
}

function ProfilePage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'overview' | 'orders' | 'wishlist' | 'settings'>('overview');

  const user = {
    name: 'Andika Pratama',
    email: 'andika.pratama@email.com',
    phone: '+62 812 3456 7890',
    address: 'Jl. Sudirman No. 123, Jakarta Pusat, DKI Jakarta 10220',
    joinedAt: 'Bergabung sejak Maret 2024',
    avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=Andika+Pratama&backgroundColor=1e293b',
  };

  const stats = [
    { label: 'Total Pesanan', value: '24' },
    { label: 'Sedang Diproses', value: '2' },
    { label: 'Wishlist', value: '12' },
    { label: 'Poin Reward', value: '1.850' },
  ];

  const recentOrders = [
    { id: 'ORD-20260712-001', date: '12 Jul 2026', items: 3, total: 'Rp 458.000', status: 'Dikirim' },
    { id: 'ORD-20260705-014', date: '05 Jul 2026', items: 1, total: 'Rp 129.000', status: 'Selesai' },
    { id: 'ORD-20260628-092', date: '28 Jun 2026', items: 5, total: 'Rp 872.500', status: 'Selesai' },
    { id: 'ORD-20260615-047', date: '15 Jun 2026', items: 2, total: 'Rp 245.000', status: 'Selesai' },
  ];

  const menuItems = [
    { id: 'overview' as const, label: 'Ringkasan', icon: User },
    { id: 'orders' as const, label: 'Pesanan Saya', icon: Package },
    { id: 'wishlist' as const, label: 'Wishlist', icon: Heart },
    { id: 'settings' as const, label: 'Pengaturan', icon: Settings },
  ];

  const statusColor = (s: string) =>
    s === 'Selesai'
      ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
      : s === 'Dikirim'
      ? 'bg-blue-50 text-blue-700 border-blue-200'
      : 'bg-amber-50 text-amber-700 border-amber-200';

  return (
    <div className="min-h-screen bg-[#fafbfc] text-[#1e293b]">
      <Header cartCount={cartItems.length} onCartClick={() => setIsCartOpen(true)} />

      <main className="max-w-7xl mx-auto px-4 md:px-6 py-8 md:py-10 space-y-8">
        <div>
          <h1 className="font-sans text-3xl md:text-4xl text-[#1e293b] leading-tight">
            Profil Saya
          </h1>
          <p className="text-sm text-[#94a3b8] mt-1">
            Kelola informasi akun, pesanan, dan preferensi belanja Anda.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-6">
          {/* Sidebar */}
          <aside className="space-y-4">
            <div className="bg-white border border-[#e2e8f0] rounded-2xl p-6 text-center">
              <div className="relative inline-block">
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-24 h-24 rounded-full border-4 border-[#f1f5f9] bg-[#f1f5f9]"
                />
                <button className="absolute bottom-0 right-0 bg-[#1e293b] text-white p-1.5 rounded-full hover:bg-[#334155] transition-colors">
                  <Edit className="w-3.5 h-3.5" />
                </button>
              </div>
              <h2 className="mt-4 font-semibold text-lg text-[#1e293b]">{user.name}</h2>
              <p className="text-xs text-[#94a3b8] mt-1">{user.joinedAt}</p>
            </div>

            <nav className="bg-white border border-[#e2e8f0] rounded-2xl p-2">
              {menuItems.map((item) => {
                const Icon = item.icon;
                const active = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                      active
                        ? 'bg-[#1e293b] text-white'
                        : 'text-[#475569] hover:bg-[#f1f5f9]'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    {item.label}
                  </button>
                );
              })}
              <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-red-600 hover:bg-red-50 transition-colors">
                <LogOut className="w-4 h-4" />
                Keluar
              </button>
            </nav>
          </aside>

          {/* Content */}
          <div className="space-y-6">
            {activeTab === 'overview' && (
              <>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {stats.map((s) => (
                    <div key={s.label} className="bg-white border border-[#e2e8f0] rounded-2xl p-5">
                      <p className="text-xs text-[#94a3b8] uppercase tracking-wide">{s.label}</p>
                      <p className="font-sans text-3xl text-[#1e293b] mt-2">{s.value}</p>
                    </div>
                  ))}
                </div>

                <div className="bg-white border border-[#e2e8f0] rounded-2xl p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-sans text-2xl text-[#1e293b]">Informasi Kontak</h3>
                    <button className="text-sm text-[#1e293b] hover:underline flex items-center gap-1">
                      <Edit className="w-3.5 h-3.5" /> Edit
                    </button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <InfoRow icon={Mail} label="Email" value={user.email} />
                    <InfoRow icon={Phone} label="Telepon" value={user.phone} />
                    <InfoRow icon={MapPin} label="Alamat" value={user.address} full />
                  </div>
                </div>

                <div className="bg-white border border-[#e2e8f0] rounded-2xl p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-sans text-2xl text-[#1e293b]">Pesanan Terakhir</h3>
                    <button
                      onClick={() => setActiveTab('orders')}
                      className="text-sm text-[#1e293b] hover:underline"
                    >
                      Lihat semua
                    </button>
                  </div>
                  <div className="divide-y divide-[#f1f5f9]">
                    {recentOrders.slice(0, 3).map((o) => (
                      <OrderRow key={o.id} order={o} statusColor={statusColor} />
                    ))}
                  </div>
                </div>
              </>
            )}

            {activeTab === 'orders' && (
              <div className="bg-white border border-[#e2e8f0] rounded-2xl p-6">
                <h3 className="font-sans text-2xl text-[#1e293b] mb-4">Semua Pesanan</h3>
                <div className="divide-y divide-[#f1f5f9]">
                  {recentOrders.map((o) => (
                    <OrderRow key={o.id} order={o} statusColor={statusColor} />
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'wishlist' && (
              <div className="bg-white border border-[#e2e8f0] rounded-2xl p-12 text-center">
                <Heart className="w-12 h-12 mx-auto text-[#cbd5e1]" />
                <h3 className="font-sans text-2xl text-[#1e293b] mt-4">Wishlist Anda</h3>
                <p className="text-sm text-[#94a3b8] mt-2">
                  Simpan produk favorit di sini agar mudah ditemukan kembali.
                </p>
              </div>
            )}

            {activeTab === 'settings' && (
              <div className="bg-white border border-[#e2e8f0] rounded-2xl p-6 space-y-4">
                <h3 className="font-sans text-2xl text-[#1e293b]">Pengaturan Akun</h3>
                <SettingRow icon={CreditCard} title="Metode Pembayaran" desc="Kelola kartu dan e-wallet tersimpan" />
                <SettingRow icon={MapPin} title="Alamat Pengiriman" desc="Tambah atau ubah alamat pengiriman" />
                <SettingRow icon={Settings} title="Notifikasi" desc="Atur preferensi email & pemberitahuan" />
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />

      <Cart
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={(id, q) =>
          setCartItems((p) => (q === 0 ? p.filter((i) => i.id !== id) : p.map((i) => (i.id === id ? { ...i, quantity: q } : i))))
        }
        onRemoveItem={(id) => setCartItems((p) => p.filter((i) => i.id !== id))}
      />
    </div>
  );
}

function InfoRow({ icon: Icon, label, value, full }: { icon: any; label: string; value: string; full?: boolean }) {
  return (
    <div className={`flex items-start gap-3 ${full ? 'md:col-span-2' : ''}`}>
      <div className="w-9 h-9 rounded-full bg-[#f1f5f9] flex items-center justify-center flex-shrink-0">
        <Icon className="w-4 h-4 text-[#475569]" />
      </div>
      <div className="min-w-0">
        <p className="text-xs text-[#94a3b8] uppercase tracking-wide">{label}</p>
        <p className="text-sm text-[#1e293b] mt-0.5 break-words">{value}</p>
      </div>
    </div>
  );
}

function OrderRow({ order, statusColor }: { order: any; statusColor: (s: string) => string }) {
  return (
    <div className="py-4 flex flex-col md:flex-row md:items-center md:justify-between gap-2">
      <div>
        <p className="text-sm font-medium text-[#1e293b]">{order.id}</p>
        <p className="text-xs text-[#94a3b8] mt-0.5">
          {order.date} · {order.items} produk
        </p>
      </div>
      <div className="flex items-center gap-4">
        <span className={`text-xs px-2.5 py-1 rounded-full border ${statusColor(order.status)}`}>
          {order.status}
        </span>
        <span className="text-sm font-semibold text-[#1e293b]">{order.total}</span>
      </div>
    </div>
  );
}

function SettingRow({ icon: Icon, title, desc }: { icon: any; title: string; desc: string }) {
  return (
    <button className="w-full flex items-center gap-4 p-4 rounded-xl hover:bg-[#f8fafc] transition-colors text-left">
      <div className="w-10 h-10 rounded-full bg-[#f1f5f9] flex items-center justify-center flex-shrink-0">
        <Icon className="w-4 h-4 text-[#475569]" />
      </div>
      <div className="flex-1">
        <p className="text-sm font-medium text-[#1e293b]">{title}</p>
        <p className="text-xs text-[#94a3b8] mt-0.5">{desc}</p>
      </div>
    </button>
  );
}

export const Route = createFileRoute('/profile')({
  head: () => ({
    meta: [
      { title: 'Profil Saya - Marketplace' },
      { name: 'description', content: 'Kelola akun, pesanan, dan preferensi belanja Anda.' },
    ],
  }),
  component: ProfilePage,
});
