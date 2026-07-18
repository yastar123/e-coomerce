import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Link } from "@/lib/next-shims";
import { categories, products, cup220Url, botol600Url, cupDusUrl } from "@/lib/products";
import { ArrowRight } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Cart from "@/components/Cart";

function CategoriesPage() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const categoryList = categories.filter((cat) => cat !== "All");

  const categoryImages: { [key: string]: string } = {
    "Cup 220ml": cup220Url,
    "Botol 600ml": botol600Url,
    "Dus / Karton": cupDusUrl,
  };

  const getCategorySlug = (category: string) =>
    category.toLowerCase().replace(/\//g, "and").replace(/&/g, "and").replace(/\s+/g, "-");

  return (
    <div className="min-h-screen bg-[#fafbfc] text-[#1e293b]">
      <Header cartCount={0} onCartClick={() => setIsCartOpen(true)} />

      <main className="max-w-7xl mx-auto px-4 md:px-6 py-8 md:py-10 space-y-10">
        {/* Hero header */}
        <div className="rounded-3xl bg-white border border-[#e8ecf1] p-8 md:p-12 relative overflow-hidden">
          <div
            className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-gradient-to-br from-[#00B4E6]/15 to-transparent blur-2xl"
            aria-hidden
          />
          <div className="relative z-10 max-w-xl space-y-4">
            <span className="inline-block text-[10px] font-bold uppercase tracking-[0.2em] text-[#00B4E6]">
              Kategori
            </span>
            <h1 className="font-sans text-4xl md:text-5xl leading-tight">Jelajahi Kategori.</h1>
            <p className="text-[#94a3b8] text-base max-w-md">
              Temukan produk pilihan dari berbagai kategori kebutuhan toko Anda.
            </p>
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {categoryList.map((category) => {
            const count = products.filter((p) => p.category === category).length;
            return (
              <Link
                key={category}
                href={`/categories/${getCategorySlug(category)}`}
                className="group"
              >
                <div className="bg-white border border-[#e8ecf1] rounded-3xl overflow-hidden hover:border-[#00B4E6]/40 hover:shadow-[0_20px_40px_-20px_rgba(59,130,246,0.2)] transition-all h-full">
                  <div className="relative h-48 md:h-56 overflow-hidden bg-[#fafbfc]">
                    <img
                      src={categoryImages[category]}
                      alt={category}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <span className="absolute top-4 left-4 bg-white/90 backdrop-blur text-[10px] font-bold uppercase tracking-[0.2em] text-[#00B4E6] px-3 py-1.5 rounded-full border border-[#e8ecf1]">
                      {count} produk
                    </span>
                  </div>
                  <div className="p-6 space-y-2">
                    <h3 className="font-sans text-2xl text-[#1e293b] leading-tight">{category}</h3>
                    <p className="text-sm text-[#94a3b8]">
                      Koleksi terpilih {category.toLowerCase()}.
                    </p>
                    <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-[#00B4E6] pt-2 group-hover:gap-3 transition-all">
                      Lihat Produk
                      <ArrowRight className="w-3.5 h-3.5" />
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </main>

      <Footer />

      <Cart
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={[]}
        onUpdateQuantity={() => {}}
        onRemoveItem={() => {}}
      />
    </div>
  );
}

export const Route = createFileRoute("/categories/")({ component: CategoriesPage });
