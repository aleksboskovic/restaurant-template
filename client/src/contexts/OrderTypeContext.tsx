import React, { createContext, useContext, useState, useEffect } from 'react';

export type OrderType = 'pickup' | 'delivery';

interface OrderTypeContextType {
  orderType: OrderType;
  setOrderType: (type: OrderType) => void;
  isDelivery: boolean;
  isPickup: boolean;
}

const OrderTypeContext = createContext<OrderTypeContextType | null>(null);

export function OrderTypeProvider({ children }: { children: React.ReactNode }) {
  const [orderType, setOrderTypeState] = useState<OrderType>(() => {
    try {
      const saved = localStorage.getItem('habesha-order-type');
      return (saved === 'delivery' || saved === 'pickup') ? saved : 'pickup';
    } catch {
      return 'pickup';
    }
  });

  const setOrderType = (type: OrderType) => {
    setOrderTypeState(type);
    try {
      localStorage.setItem('habesha-order-type', type);
    } catch {
      // ignore
    }
  };

  return (
    <OrderTypeContext.Provider value={{
      orderType,
      setOrderType,
      isDelivery: orderType === 'delivery',
      isPickup: orderType === 'pickup',
    }}>
      {children}
    </OrderTypeContext.Provider>
  );
}

export function useOrderType() {
  const ctx = useContext(OrderTypeContext);
  if (!ctx) throw new Error('useOrderType must be used within OrderTypeProvider');
  return ctx;
}
