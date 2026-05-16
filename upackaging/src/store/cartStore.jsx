import { useState, useEffect, createContext, useContext } from "react";

const CartContext = createContext(null);

/**
 * CartProvider — ครอบ App ทั้งหมดเพื่อให้ทุกหน้าเข้าถึง cart ได้
 * วาง <CartProvider> ใน main.jsx ครอบ <App />
 */
export function CartProvider({ children }) {
  const [items, setItems] = useState(() => {
    try {
      const saved = localStorage.getItem("udp_cart");
      return saved ? JSON.parse(saved) : [];
    } catch { return []; }
  });

  // sync ลง localStorage ทุกครั้งที่ items เปลี่ยน
  useEffect(() => {
    localStorage.setItem("udp_cart", JSON.stringify(items));
  }, [items]);

  function addItem(product, qty = 1, options = []) {
    setItems(prev => {
      const key = `${product.id}_${options.join(",")}`;
      const exists = prev.find(i => i.key === key);
      if (exists) {
        return prev.map(i => i.key === key ? { ...i, qty: i.qty + qty } : i);
      }
      return [...prev, { key, product, qty, options }];
    });
  }

  function updateQty(key, qty) {
    if (qty <= 0) return removeItem(key);
    setItems(prev => prev.map(i => i.key === key ? { ...i, qty } : i));
  }

  function removeItem(key) {
    setItems(prev => prev.filter(i => i.key !== key));
  }

  function clearCart() { setItems([]); }

  const totalItems = items.reduce((sum, i) => sum + i.qty, 0);

  return (
    <CartContext.Provider value={{ items, addItem, updateQty, removeItem, clearCart, totalItems }}>
      {children}
    </CartContext.Provider>
  );
}

// hook ใช้ใน component ทุกที่
export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside <CartProvider>");
  return ctx;
}