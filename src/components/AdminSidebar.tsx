import { Link } from "@/lib/next-shims";
import { usePathname } from "@/lib/next-shims";
import {
  Menu,
  X,
  LayoutDashboard,
  Package,
  Layers,
  ShoppingCart,
  Users,
  Tag,
  LogOut,
  ChevronDown,
  HelpCircle,
  CreditCard,
} from "lucide-react";
import { useState } from "react";
import { logoUrl } from "@/lib/products";

export default function AdminSidebar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [expandedItems, setExpandedItems] = useState<string[]>([]);

  const toggleExpanded = (item: string) => {
    setExpandedItems((prev) =>
      prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item],
    );
  };

  const menuItems = [
    {
      label: "Dashboard",
      href: "/admin",
      icon: LayoutDashboard,
      exact: true,
    },
    {
      label: "Produk",
      href: "/admin/products",
      icon: Package,
    },
    {
      label: "Kategori",
      href: "/admin/categories",
      icon: Layers,
    },
    {
      label: "Pesanan",
      href: "/admin/orders",
      icon: ShoppingCart,
    },
    {
      label: "Pengguna",
      href: "/admin/users",
      icon: Users,
    },
    {
      label: "Pelanggan",
      href: "/admin/customers",
      icon: Users,
    },
    {
      label: "Promosi",
      href: "/admin/promotions",
      icon: Tag,
    },
    {
      label: "FAQ",
      href: "/admin/faq",
      icon: HelpCircle,
    },
    {
      label: "Pembayaran & Keuangan",
      href: "/admin/payments",
      icon: CreditCard,
    },
  ];

  const isActive = (href: string, exact?: boolean) => {
    if (exact) return pathname === href;
    return pathname?.startsWith(href);
  };

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden fixed top-4 left-4 z-40 p-2 bg-white rounded-full shadow-lg border border-[#e8ecf1] text-[#1e293b]"
      >
        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 md:hidden z-30"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed md:static inset-y-0 left-0 w-64 bg-gradient-to-b from-[#00B4E6] to-[#0096c7] text-white transition-transform duration-300 z-40 ${
          isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        <div className="h-full flex flex-col overflow-y-auto">
          {/* Logo */}
          <div className="p-6 border-b border-white/15">
            <Link href="/admin" className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center overflow-hidden">
                <img src={logoUrl} alt="Aerova" className="w-full h-full object-contain" />
              </div>
              <div>
                <div className="font-bold text-lg">Admin</div>
                <div className="text-xs text-white/70">Aerova Official</div>
              </div>
            </Link>
          </div>

          {/* Menu Items */}
          <nav className="flex-1 px-3 py-6 space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.href, item.exact);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    active
                      ? "bg-white text-[#00B4E6] font-semibold shadow-sm"
                      : "text-white/85 hover:bg-white/10"
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* Footer */}
          <div className="p-3 border-t border-white/15">
            <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-white/85 hover:bg-white/10 transition-colors">
              <LogOut className="w-5 h-5" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}
