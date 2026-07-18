

import { ArrowRight, Truck, Ticket } from 'lucide-react';

export default function HeroBanner() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-2 gap-4 h-auto md:h-[520px] mb-10">
      {/* Main hero tile */}
      <div className="md:col-span-3 md:row-span-2 rounded-3xl bg-white border border-[#e8ecf1] relative overflow-hidden group p-8 md:p-12 flex flex-col justify-end min-h-[360px]">
        {/* Decorative gradient orbs */}
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-gradient-to-br from-[#00B4E6]/15 to-transparent blur-2xl" aria-hidden />
        <div className="absolute top-1/2 -right-16 w-72 h-72 rounded-full bg-gradient-to-tr from-[#e8ecf1] to-transparent blur-3xl" aria-hidden />

        <div className="relative z-10 space-y-5 max-w-xl">
          <span className="inline-block text-[10px] font-bold uppercase tracking-[0.2em] text-[#00B4E6]">
            Aerova Official · Perfectly Fresh
          </span>
          <h1 className="font-sans text-4xl sm:text-5xl md:text-6xl text-[#1e293b] leading-[1.05]">
            Alami, Segar,<br />
            <span className="text-[#00B4E6]">Terpercaya.</span>
          </h1>
          <p className="text-[#94a3b8] text-base md:text-lg max-w-md">
            Air mineral dalam kemasan cup yang praktis dibawa ke mana saja — cocok untuk sekolah, kantor, acara keluarga, hingga kegiatan luar ruangan.
          </p>
          <a href="https://wa.me/6281179122333" className="inline-flex items-center gap-2 bg-[#00B4E6] text-white px-6 py-3.5 rounded-full text-sm font-semibold hover:bg-[#0077B8] transition-all active:scale-95">
            Pesan via WhatsApp
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>

      {/* Hot deal tile */}
      <div className="rounded-3xl bg-gradient-to-br from-[#00B4E6] to-[#0077B8] p-6 md:p-7 text-white relative overflow-hidden flex flex-col justify-between min-h-[180px]">
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16" aria-hidden />
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full -ml-12 -mb-12" aria-hidden />
        <div className="relative flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] opacity-90">
          <Ticket className="w-3.5 h-3.5" /> Promo
        </div>
        <div className="relative">
          <h3 className="font-sans text-2xl md:text-3xl mb-1">Aerova Cup 220ml</h3>
          <p className="text-sm text-white/80">Praktis, higienis, langsung minum di mana saja.</p>
        </div>
      </div>

      {/* Voucher tile */}
      <div className="rounded-3xl bg-white border border-[#e8ecf1] p-6 md:p-7 relative overflow-hidden flex flex-col justify-between min-h-[180px]">
        <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-[#00B4E6]">
          <Truck className="w-3.5 h-3.5" /> Pengiriman
        </div>
        <div>
          <h3 className="font-sans text-2xl md:text-3xl mb-1 text-[#1e293b]">Order Grosir</h3>
          <p className="text-sm text-[#94a3b8]">Hubungi 0811-7912-233 untuk pemesanan dus.</p>
        </div>
      </div>
    </div>
  );
}
