export type OrderStatus = 'Placed' | 'Preparing' | 'Ready for Pickup';

export interface Order {
  id: string;
  total: number;
  pickupTime: string;
  status: OrderStatus;
  createdAt: string;
}