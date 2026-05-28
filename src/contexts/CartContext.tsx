import React, { useState, createContext, useContext } from 'react';
import { Product, CartItem } from '../types';
interface CartContextType {
  cart: CartItem[];
  totalQty: number;
  subtotal: number;
  tax: number;
  total: number;
  addToCart: (product: Product) => void;
  updateQuantity: (id: string, delta: number) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
  resetCart: () => void;
}
const CartContext = createContext<CartContextType | undefined>(undefined);
export function CartProvider({ children }: {children: ReactNode;}) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const addToCart = (product: Product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
        item.id === product.id ?
        {
          ...item,
          quantity: item.quantity + 1
        } :
        item
        );
      }
      return [
      ...prev,
      {
        ...product,
        quantity: 1
      }];

    });
  };
  const updateQuantity = (id: string, delta: number) => {
    setCart((prev) =>
    prev.map((item) => {
      if (item.id === id) {
        const newQty = item.quantity + delta;
        return newQty > 0 ?
        {
          ...item,
          quantity: newQty
        } :
        item;
      }
      return item;
    })
    );
  };
  const removeFromCart = (id: string) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };
  const clearCart = () => {
    if (window.confirm('ยืนยันการล้างตะกร้าสินค้า?')) {
      setCart([]);
    }
  };
  const resetCart = () => setCart([]);
  const totalQty = cart.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const tax = subtotal * 0.07;
  const total = subtotal + tax;
  return (
    <CartContext.Provider
      value={{
        cart,
        totalQty,
        subtotal,
        tax,
        total,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        resetCart
      }}>
      
      {children}
    </CartContext.Provider>);

}
export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
}