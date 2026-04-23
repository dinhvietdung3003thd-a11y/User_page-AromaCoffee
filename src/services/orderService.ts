import type { OrderDetail, OrderSummary } from '../types/order.types';

const mockOrders: OrderDetail[] = [
  {
    orderId: 'ORD-1001',
    orderDate: '2026-04-18',
    status: 'completed',
    totalAmount: 13.40,
    items: [
      {
        productId: 'c1',
        productName: 'Caffe Latte',
        quantity: 2,
        unitPrice: 4.5,
        subtotal: 9.0
      },
      {
        productId: 'k1',
        productName: 'Cheesecake Slice',
        quantity: 1,
        unitPrice: 4.4,
        subtotal: 4.4
      }
    ]
  },
  {
    orderId: 'ORD-1002',
    orderDate: '2026-04-20',
    status: 'paid',
    totalAmount: 9.10,
    items: [
      {
        productId: 't2',
        productName: 'Peach Iced Tea',
        quantity: 1,
        unitPrice: 3.8,
        subtotal: 3.8
      },
      {
        productId: 'f1',
        productName: 'Mocha Freeze',
        quantity: 1,
        unitPrice: 5.3,
        subtotal: 5.3
      }
    ]
  }
];

export const orderService = {
  getOrders(): OrderSummary[] {
    return mockOrders.map(({ orderId, orderDate, status, totalAmount }) => ({
      orderId,
      orderDate,
      status,
      totalAmount
    }));
  },

  getOrderById(orderId: string): OrderDetail | null {
    return mockOrders.find((order) => order.orderId === orderId) ?? null;
  }
};
