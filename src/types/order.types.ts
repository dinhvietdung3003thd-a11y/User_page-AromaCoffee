export type OrderStatus = string;

export interface OrderItem {
  productId: string;
  productName: string;
  quantity: number;
  unitPrice: number;
  subtotal: number;
}

export interface OrderSummary {
  orderId: string;
  orderDate: string;
  status: OrderStatus;
  totalAmount: number;
}

export interface OrderDetail extends OrderSummary {
  items: OrderItem[];
}
