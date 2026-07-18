export const logoUrl = "/logo.jpg";
export const cup220Url = "/cup.png";
export const botol600Url = "/botol.png";
export const cupDusUrl = "/cup_dus.png";
export const botolDusUrl = "/botol_dus.png";

export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  originalPrice?: number;
  image: string;
  discount?: number;
  badge?: string;
  description?: string;
  inStock: boolean;
}

export const categories = ["All", "Cup 220ml", "Botol 600ml", "Dus / Karton"];

export interface BrowseCategory {
  id: string;
  name: string;
  image: string;
}

export const browseCategories: BrowseCategory[] = [
  { id: "cup", name: "Cup 220ml", image: cup220Url },
  { id: "botol", name: "Botol 600ml", image: botol600Url },
  { id: "dus-cup", name: "Dus Cup", image: cupDusUrl },
  { id: "dus-botol", name: "Dus Botol", image: botolDusUrl },
];

export const products: Product[] = [
  {
    id: "1",
    name: "Aerova Air Mineral Cup 220ml",
    category: "Cup 220ml",
    price: 500,
    image: cup220Url,
    description:
      "Air mineral Aerova kemasan cup 220ml. Praktis dibawa ke mana saja, cocok untuk acara keluarga, rapat, sekolah, dan kegiatan luar ruangan. Alami, segar, dan terpercaya.",
    inStock: true,
    badge: "Praktis",
  },
  {
    id: "2",
    name: "Aerova Air Mineral Botol 600ml",
    category: "Botol 600ml",
    price: 3000,
    image: botol600Url,
    description:
      "Air mineral Aerova kemasan botol 600ml. Kemurnian alami dalam setiap tetesan, menyegarkan aktivitas harian Anda.",
    inStock: true,
    badge: "Baru",
  },
  {
    id: "3",
    name: "Aerova Cup 220ml 1 Dus (isi 48 Cup)",
    category: "Dus / Karton",
    price: 22000,
    originalPrice: 24000,
    discount: 8,
    image: cupDusUrl,
    description:
      "Satu dus Aerova cup 220ml berisi 48 cup. Hemat untuk kebutuhan acara, kantor, atau stok rumah tangga.",
    inStock: true,
    badge: "Hemat",
  },
  {
    id: "4",
    name: "Aerova Botol 600ml 1 Dus (isi 24 Botol)",
    category: "Dus / Karton",
    price: 65000,
    originalPrice: 72000,
    discount: 10,
    image: botolDusUrl,
    description:
      "Satu dus Aerova botol 600ml berisi 24 botol. Solusi hidrasi lengkap untuk keluarga dan kegiatan bersama.",
    inStock: true,
    badge: "Best Seller",
  },
];
