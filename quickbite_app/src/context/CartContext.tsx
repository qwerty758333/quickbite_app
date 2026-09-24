import { createContext, PropsWithChildren, useContext, useMemo, useState } from 'react';

import { MenuItem } from '@/data/menuItems';

export interface CartItem extends MenuItem {
  quantity: number;
}

interface CartContextValue {
  cartItems: CartItem[];
  cartItemCount: number;
  cartSubtotal: number;
  addToCart: (item: MenuItem, quantity?: number) => void;
  removeFromCart: (itemId: string) => void;
  increaseQuantity: (itemId: string) => void;
  decreaseQuantity: (itemId: string) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextValue | undefined>(undefined);

export function CartProvider({ children }: PropsWithChildren) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  // Adds an item or increases its existing quantity so one product never creates duplicate rows.
  const addToCart = (item: MenuItem, quantity = 1) => {
    setCartItems((currentItems) => {
      const existingItem = currentItems.find((cartItem) => cartItem.id === item.id);
      if (existingItem) {
        return currentItems.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + quantity }
            : cartItem,
        );
      }
      return [...currentItems, { ...item, quantity }];
    });
  };

  // Removes a product completely, regardless of its current quantity.
  const removeFromCart = (itemId: string) => {
    setCartItems((currentItems) => currentItems.filter((item) => item.id !== itemId));
  };

  // Increases one cart row while preserving every other row in the shared state.
  const increaseQuantity = (itemId: string) => {
    setCartItems((currentItems) =>
      currentItems.map((item) =>
        item.id === itemId ? { ...item, quantity: item.quantity + 1 } : item,
      ),
    );
  };

  // Decreases a row and removes it when its quantity reaches zero.
  const decreaseQuantity = (itemId: string) => {
    setCartItems((currentItems) =>
      currentItems
        .map((item) => (item.id === itemId ? { ...item, quantity: item.quantity - 1 } : item))
        .filter((item) => item.quantity > 0),
    );
  };

  const clearCart = () => setCartItems([]);

  // These derived values keep the cart badge and checkout total synchronized automatically.
  const cartItemCount = useMemo(
    () => cartItems.reduce((total, item) => total + item.quantity, 0),
    [cartItems],
  );
  const cartSubtotal = useMemo(
    () => cartItems.reduce((total, item) => total + item.price * item.quantity, 0),
    [cartItems],
  );

  return (
    <CartContext.Provider
      value={{
        cartItems,
        cartItemCount,
        cartSubtotal,
        addToCart,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity,
        clearCart,
      }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used inside CartProvider');
  }
  return context;
}