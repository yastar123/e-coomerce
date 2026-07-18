import { Product } from '@/lib/products';
import { X, Plus, Minus, Trash2, ShoppingBag, ArrowRight } from 'lucide-react';

interface CartItem extends Product {
  quantity: number;
}

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (id: string, quantity: number) => void;
  onRemoveItem: (id: string) => void;
}

const formatPrice = (price: number) => `Rp ${price.toLocaleString('id-ID')}`;

export default function Cart({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
}: CartProps) {
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-[#1e293b]/40 backdrop-blur-sm z-40 transition-opacity"
          onClick={onClose}
        />
      )}

      {/* Drawer */}
      <aside
        className={
          'fixed right-0 top-0 h-full w-full max-w-md bg-[#fafbfc] z-50 flex flex-col shadow-[0_30px_60px_-15px_rgba(30,41,59,0.2)] transform transition-transform duration-300 ' +
          (isOpen ? 'translate-x-0' : 'translate-x-full')
        }
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-5 border-b border-[#e8ecf1]">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#00B4E6]">
              Keranjang
            </p>
            <h2 className="font-sans text-2xl text-[#1e293b] leading-tight">
              Belanja Anda
            </h2>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 inline-flex items-center justify-center rounded-full border border-[#e8ecf1] bg-white text-[#94a3b8] hover:text-[#1e293b] transition-colors"
            aria-label="Tutup"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-5 py-5 space-y-3">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center gap-3 py-16">
              <div className="w-16 h-16 rounded-full bg-white border border-[#e8ecf1] flex items-center justify-center">
                <ShoppingBag className="w-6 h-6 text-[#94a3b8]" />
              </div>
              <p className="font-sans text-2xl text-[#1e293b]">Masih kosong</p>
              <p className="text-sm text-[#94a3b8] max-w-[220px]">
                Tambahkan produk untuk mulai berbelanja.
              </p>
            </div>
          ) : (
            items.map((item) => (
              <div
                key={item.id}
                className="flex gap-3 bg-white border border-[#e8ecf1] rounded-2xl p-3"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-20 h-20 rounded-xl object-cover bg-[#fafbfc]"
                />
                <div className="flex-1 min-w-0 flex flex-col">
                  <h4 className="text-sm font-medium text-[#1e293b] line-clamp-2 leading-snug">
                    {item.name}
                  </h4>
                  <p className="text-sm font-bold text-[#1e293b] mt-1">
                    {formatPrice(item.price)}
                  </p>
                  <div className="flex items-center justify-between mt-auto pt-2">
                    <div className="flex items-center gap-1 bg-[#fafbfc] border border-[#e8ecf1] rounded-full p-1">
                      <button
                        onClick={() =>
                          onUpdateQuantity(item.id, Math.max(1, item.quantity - 1))
                        }
                        className="w-6 h-6 inline-flex items-center justify-center rounded-full text-[#94a3b8] hover:text-[#1e293b] transition-colors"
                        aria-label="Kurang"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="text-xs font-semibold text-[#1e293b] min-w-[20px] text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                        className="w-6 h-6 inline-flex items-center justify-center rounded-full text-[#94a3b8] hover:text-[#1e293b] transition-colors"
                        aria-label="Tambah"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                    <button
                      onClick={() => onRemoveItem(item.id)}
                      className="w-8 h-8 inline-flex items-center justify-center rounded-full text-[#94a3b8] hover:text-[#00B4E6] hover:bg-[#00B4E6]/10 transition-colors"
                      aria-label="Hapus"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-[#e8ecf1] px-5 py-5 bg-white space-y-4">
            <div className="space-y-2 text-sm">
              <div className="flex justify-between text-[#94a3b8]">
                <span>Subtotal</span>
                <span className="text-[#1e293b] font-medium">{formatPrice(total)}</span>
              </div>
              <div className="flex justify-between text-[#94a3b8]">
                <span>Ongkir</span>
                <span className="text-[#00B4E6] font-semibold">Gratis</span>
              </div>
            </div>
            <div className="flex items-baseline justify-between pt-3 border-t border-[#e8ecf1]">
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#94a3b8]">
                Total
              </span>
              <span className="font-sans text-2xl text-[#1e293b]">
                {formatPrice(total)}
              </span>
            </div>
            <button className="w-full inline-flex items-center justify-center gap-2 bg-[#1e293b] text-white px-6 py-3.5 rounded-full text-sm font-semibold hover:bg-[#00B4E6] transition-all active:scale-[0.98]">
              Lanjut ke Pembayaran
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={onClose}
              className="w-full text-xs font-semibold uppercase tracking-widest text-[#94a3b8] hover:text-[#1e293b] transition-colors py-1"
            >
              Lanjut Belanja
            </button>
          </div>
        )}
      </aside>
    </>
  );
}
