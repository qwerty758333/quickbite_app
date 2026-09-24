import type { MenuItem } from '@/data/menuItems';

export type OrderStatus = 'PLACED' | 'PREPARING' | 'READY';

export interface CartItem extends MenuItem {
  quantity: number;
}

export interface Order {
  id: string;
  items: CartItem[];
  subtotal: number;
  status: OrderStatus;
  estimatedPickupTime: string;
}

export const formatOrderStatus = (status: OrderStatus) => {
  switch (status) {
    case 'PLACED':
      return 'Placed';
    case 'PREPARING':
      return 'Preparing';
    case 'READY':
      return 'Ready for Pickup';
    default:
      return status;
  }
};