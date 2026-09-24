import { createContext, PropsWithChildren, useContext, useMemo, useState } from 'react';

import { MenuItem } from '@/data/menuItems';
import type { CartItem, Order, OrderStatus } from '@/types/order';

interface CartContextValue {
  cartItems: CartItem[];
  currentOrder: Order | null;
  cartItemCount: number;
  cartSubtotal: number;
  addToCart: (item: MenuItem, quantity?: number) => void;
  removeFromCart: (itemId: string) => void;
  increaseQuantity: (itemId: string) => void;
  decreaseQuantity: (itemId: string) => void;
  clearCart: () => void;
  placeOrder: () => Order | null;
  advanceOrderStatus: () => void;
}

const CartContext = createContext<CartContextValue | undefined>(undefined);

const generateOrderId = () => `QB-${Date.now()}-${Math.floor(Math.random() * 9000 + 1000)}`;

const generatePickupTime = () => {
  const pickupDate = new Date();
  pickupDate.setMinutes(pickupDate.getMinutes() + 15);

  return pickupDate.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });
};

export function CartProvider({ children }: PropsWithChildren) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [currentOrder, setCurrentOrder] = useState<Order | null>(null);

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

  // The cart and current order are intentionally separate states.
  // The cart only holds items waiting to be ordered, while the order stores a snapshot after checkout.
  const placeOrder = () => {
    if (cartItems.length === 0) {
      return null;
    }

    const orderItems: CartItem[] = cartItems.map((item) => ({ ...item }));
    const subtotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

    // The order must keep its own copy of the cart state because the cart is cleared immediately after placement.
    const newOrder: Order = {
      id: generateOrderId(),
      items: orderItems,
      subtotal,
      status: 'PLACED',
      estimatedPickupTime: generatePickupTime(),
    };

    setCurrentOrder(newOrder);
    setCartItems([]);

    return newOrder;
  };

  // Advances the current order through the prototype status flow: PLACED -> PREPARING -> READY.
  const advanceOrderStatus = () => {
    setCurrentOrder((current) => {
      if (!current) {
        return current;
      }

      if (current.status === 'PLACED') {
        return { ...current, status: 'PREPARING' };
      }

      if (current.status === 'PREPARING') {
        return { ...current, status: 'READY' };
      }

      return current;
    });
  };

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
        currentOrder,
        cartItemCount,
        cartSubtotal,
        addToCart,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity,
        clearCart,
        placeOrder,
        advanceOrderStatus,
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