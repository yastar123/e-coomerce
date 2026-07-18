import { useState } from "react";
import { Link } from "@/lib/next-shims";
import { Search, MapPin, ShoppingCart, Bell, User, Menu, X } from "lucide-react";
import { logoUrl } from "@/lib/products";

interface HeaderProps {
  cartCount: number;
  onCartClick: () => void;
}

const navItems = [
  { label: "Semua", href: "/categories" },
  { label: "Cup 220ml", href: "/categories/cup-220ml" },
  { label: "Botol 600ml", href: "/categories/botol-600ml" },
  { label: "Dus / Karton", href: "/categories/dus-and-karton" },
];

export default function Header({ cartCount }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 backdrop-blur-md bg-[#fafbfc]/85 border-b border-[#e8ecf1]">
      {/* Main Header - Logo, Search, Icons */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 h-16 md:h-20 flex items-center justify-between gap-3 md:gap-8">
        {/* Logo */}
        <Link href="/">
          <div className="flex items-center gap-2 shrink-0 cursor-pointer">
            <img
              src={logoUrl}
              alt="Aerova Official"
              className="h-10 md:h-12 w-auto object-contain"
            />
          </div>
        </Link>

        {/* Location — desktop only */}
        <div className="hidden lg:flex items-center gap-1.5 text-xs text-[#94a3b8] shrink-0 border border-[#e8ecf1] bg-white rounded-full px-3 py-1.5">
          <MapPin className="w-3.5 h-3.5" />
          <span>
            Kirim ke <span className="text-[#1e293b] font-medium">Indonesia</span>
          </span>
        </div>

        {/* Search Bar */}
        <div className="flex-1 min-w-0 max-w-xl relative">
          <Search className="w-4 h-4 text-[#94a3b8] absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            placeholder="Cari kebutuhan grosir..."
            className="w-full bg-white border border-[#e8ecf1] rounded-full py-2.5 pl-10 pr-4 text-sm outline-none focus:border-[#00B4E6] focus:ring-4 focus:ring-[#00B4E6]/10 transition-all"
          />
        </div>

        {/* Right Icons */}
        <div className="flex items-center gap-1 md:gap-2 shrink-0">
          <Link href="/cart">
            <button className="p-2.5 rounded-full text-[#94a3b8] hover:text-[#00B4E6] hover:bg-white transition-colors relative">
              <ShoppingCart className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute top-0.5 right-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-[#00B4E6] text-[10px] font-bold text-white px-1">
                  {cartCount}
                </span>
              )}
            </button>
          </Link>
          <button className="hidden md:inline-flex p-2.5 rounded-full text-[#94a3b8] hover:text-[#00B4E6] hover:bg-white transition-colors relative">
            <Bell className="w-5 h-5" />
            <span className="absolute top-2 right-2 w-1.5 h-1.5 bg-[#00B4E6] rounded-full"></span>
          </button>
          <button className="hidden md:inline-flex p-2.5 rounded-full text-[#94a3b8] hover:text-[#00B4E6] hover:bg-white transition-colors">
            <User className="w-5 h-5" />
          </button>
          <button
            className="md:hidden p-2.5 rounded-full text-[#94a3b8] hover:text-[#00B4E6] hover:bg-white transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Menu"
          >
            {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Category Nav */}
      <nav className="max-w-7xl mx-auto px-4 md:px-6 pb-3 overflow-x-auto no-scrollbar">
        <div className="flex items-center gap-6 md:gap-8 text-xs font-semibold uppercase tracking-widest min-w-max">
          {navItems.map((item, i) => (
            <Link key={item.href} href={item.href}>
              <button
                className={
                  i === 0
                    ? "text-[#00B4E6] pb-1 border-b-2 border-[#00B4E6]"
                    : "text-[#94a3b8] hover:text-[#1e293b] pb-1 border-b-2 border-transparent transition-colors"
                }
              >
                {item.label}
              </button>
            </Link>
          ))}
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-[#e8ecf1] px-4 py-3">
          <div className="space-y-1">
            {navItems.slice(1).map((item) => (
              <Link key={item.href} href={item.href}>
                <button className="block w-full text-left px-3 py-2 text-sm text-[#1e293b] hover:bg-[#fafbfc] rounded-lg">
                  {item.label}
                </button>
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
