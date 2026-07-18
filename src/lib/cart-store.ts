import { useEffect, useState } from 'react';
import type { Product } from '@/lib/products';

export interface CartItem extends Product {
  quantity: number;
}

const STORAGE_KEY = 'aerova_cart';
const EVENT = 'aerova:cart-change';

function isBrowser() {
  return typeof window !== 'undefined';
}

function read(): CartItem[] {
  if (!isBrowser()) return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as CartItem[]) : [];
  } catch {
    return [];
  }
}

function write(items: CartItem[]) {
  if (!isBrowser()) return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    window.dispatchEvent(new CustomEvent(EVENT));
  } catch {
    // ignore
  }
}

export function getCart(): CartItem[] {
  return read();
}

export function addToCart(product: Product, quantity: number = 1) {
  const items = read();
  const existing = items.find((i) => i.id === product.id);
  const next = existing
    ? items.map((i) => (i.id === product.id ? { ...i, quantity: i.quantity + quantity } : i))
    : [...items, { ...product, quantity }];
  write(next);
}

export function updateQuantity(id: string, quantity: number) {
  const items = read();
  const next =
    quantity <= 0
      ? items.filter((i) => i.id !== id)
      : items.map((i) => (i.id === id ? { ...i, quantity } : i));
  write(next);
}

export function removeFromCart(id: string) {
  write(read().filter((i) => i.id !== id));
}

export function clearCart() {
  write([]);
}

const listeners = new Set<() => void>();
if (typeof window !== 'undefined') {
  window.addEventListener(EVENT, () => listeners.forEach((l) => l()));
  window.addEventListener('storage', (e) => {
    if (e.key === STORAGE_KEY) listeners.forEach((l) => l());
  });
}

export function useCart(): CartItem[] {
  const [items, setItems] = useState<CartItem[]>([]);
  useEffect(() => {
    setItems(read());
    const sync = () => setItems(read());
    listeners.add(sync);
    return () => {
      listeners.delete(sync);
    };
  }, []);
  return items;
}
