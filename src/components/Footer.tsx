import { Link } from "@/lib/next-shims";
import { Facebook, Instagram, Twitter, Youtube, ArrowRight } from "lucide-react";
import { logoUrl } from "@/lib/products";

const columns = [
  {
    title: "Tentang",
    links: [
      { label: "Tentang Aerova", href: "#" },
      { label: "Hubungi Kami", href: "https://wa.me/6281179122333" },
      { label: "Karir", href: "#" },
      { label: "Blog & Berita", href: "#" },
    ],
  },
  {
    title: "Bantuan",
    links: [
      { label: "FAQ", href: "#" },
      { label: "Lacak Pesanan", href: "#" },
      { label: "Pengembalian Barang", href: "#" },
      { label: "Kebijakan Privasi", href: "#" },
    ],
  },
  {
    title: "Layanan",
    links: [
      { label: "Gratis Ongkir", href: "#" },
      { label: "Program B2B", href: "#" },
      { label: "Membership", href: "#" },
      { label: "Gift Card", href: "#" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="bg-[#fafbfc] border-t border-[#e8ecf1] mt-20">
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-14 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-8">
          {/* Brand + newsletter */}
          <div className="md:col-span-5 space-y-5">
            <div className="flex items-center gap-2">
              <img src={logoUrl} alt="Aerova Official" className="h-14 w-auto object-contain" />
            </div>
            <p className="text-sm text-[#94a3b8] max-w-sm leading-relaxed">
              Aerova Official — air minum dalam kemasan dengan kemurnian alami. Alami, segar,
              terpercaya untuk hidrasi harian Anda. WhatsApp: 0811-7912-233.
            </p>

            <form
              onSubmit={(e) => e.preventDefault()}
              className="flex items-center gap-2 bg-white border border-[#e8ecf1] rounded-full p-1.5 pl-5 max-w-sm focus-within:border-[#00B4E6] focus-within:ring-4 focus-within:ring-[#00B4E6]/10 transition-all"
            >
              <input
                type="email"
                placeholder="Email Anda"
                className="flex-1 bg-transparent text-sm text-[#1e293b] placeholder:text-[#94a3b8] outline-none min-w-0"
              />
              <button
                type="submit"
                className="inline-flex items-center gap-1 bg-[#1e293b] text-white px-4 py-2 rounded-full text-xs font-semibold hover:bg-[#00B4E6] transition-colors shrink-0"
              >
                Daftar
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </form>
          </div>

          {/* Link columns */}
          {columns.map((col) => (
            <div key={col.title} className="md:col-span-2 space-y-4">
              <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#00B4E6]">
                {col.title}
              </h4>
              <ul className="space-y-2.5">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <a
                      href={l.href}
                      className="text-sm text-[#94a3b8] hover:text-[#1e293b] transition-colors"
                    >
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Social */}
          <div className="md:col-span-1 space-y-4">
            <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#00B4E6]">
              Ikuti
            </h4>
            <div className="flex md:flex-col gap-2">
              {[Facebook, Instagram, Twitter, Youtube].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-9 h-9 inline-flex items-center justify-center rounded-full border border-[#e8ecf1] bg-white text-[#94a3b8] hover:text-[#00B4E6] hover:border-[#00B4E6]/40 transition-colors"
                  aria-label="Social"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="mt-12 pt-6 border-t border-[#e8ecf1] flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-xs text-[#94a3b8]">
            © {new Date().getFullYear()} Aerova Official. Semua hak dilindungi.
          </p>
          <div className="flex items-center gap-5 text-xs text-[#94a3b8]">
            <a href="#" className="hover:text-[#1e293b] transition-colors">
              Syarat
            </a>
            <a href="#" className="hover:text-[#1e293b] transition-colors">
              Privasi
            </a>
            <a href="#" className="hover:text-[#1e293b] transition-colors">
              Cookies
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
