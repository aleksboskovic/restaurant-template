import React, { createContext, useContext, useState, useEffect } from 'react';

export interface CartItem {
  id: string;
  name: string;
  nameEn: string;
  nameAm: string;
  price: number;        // active price (depends on orderType at time of adding)
  pricePickup: number;  // always the pickup price
  priceDelivery: number; // always the delivery price
  quantity: number;
}

interface CartContextType {
  items: CartItem[];
  addItem: (item: Omit<CartItem, 'quantity'>) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  /** Recalculate total based on given orderType */
  getTotalForType: (type: 'pickup' | 'delivery') => number;
  total: number;
  itemCount: number;
}

const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('habesha-cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('habesha-cart', JSON.stringify(items));
  }, [items]);

  const addItem = (item: Omit<CartItem, 'quantity'>) => {
    setItems(prev => {
      const existing = prev.find(i => i.id === item.id);
      if (existing) {
        // Update prices in case orderType changed
        return prev.map(i => i.id === item.id
          ? {
              ...i,
              quantity: i.quantity + 1,
              price: item.price,
              pricePickup: item.pricePickup ?? item.price,
              priceDelivery: item.priceDelivery ?? item.price,
            }
          : i
        );
      }
      return [...prev, {
        ...item,
        pricePickup: item.pricePickup ?? item.price,
        priceDelivery: item.priceDelivery ?? item.price,
        quantity: 1,
      }];
    });
  };

  const removeItem = (id: string) => {
    setItems(prev => {
      const existing = prev.find(i => i.id === id);
      if (existing && existing.quantity > 1) {
        return prev.map(i => i.id === id ? { ...i, quantity: i.quantity - 1 } : i);
      }
      return prev.filter(i => i.id !== id);
    });
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      setItems(prev => prev.filter(i => i.id !== id));
    } else {
      setItems(prev => prev.map(i => i.id === id ? { ...i, quantity } : i));
    }
  };

  const clearCart = () => setItems([]);

  const getTotalForType = (type: 'pickup' | 'delivery') => {
    return items.reduce((sum, item) => {
      const price = type === 'delivery' ? (item.priceDelivery ?? item.price) : (item.pricePickup ?? item.price);
      return sum + price * item.quantity;
    }, 0);
  };

  // Default total uses the stored price (set at time of adding)
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider value={{ items, addItem, removeItem, updateQuantity, clearCart, getTotalForType, total, itemCount }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
}
