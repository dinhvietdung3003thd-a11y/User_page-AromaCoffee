import { appConfig } from '../config/appConfig';
import type { OrderDetail, OrderSummary } from '../types/order.types';

interface CreateOrderDetailRequest {
  productId: number;
  quantity: number;
}

interface CreateOrderRequest {
  orderDate: string;
  tableId: null;
  note: string;
  details: CreateOrderDetailRequest[];
}

interface CreateOrderResponse {
  orderId: number;
}

const mockOrders: OrderDetail[] = [
  {
    orderId: 'ORD-1001',
    orderDate: '2026-04-18',
    status: 'completed',
    totalAmount: 13.4,
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
    totalAmount: 9.1,
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

const resolveApiUrl = (path: string) => `${appConfig.apiBaseUrl}${path}`;

const parseErrorMessage = async (response: Response): Promise<string> => {
  try {
    const data = (await response.json()) as { message?: string; error?: string; title?: string };
    return data.message || data.error || data.title || 'Unable to create order. Please try again.';
  } catch {
    return 'Unable to create order. Please try again.';
  }
};

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
  },

  async createClientOrder(payload: CreateOrderRequest, token: string): Promise<CreateOrderResponse> {
    const response = await fetch(resolveApiUrl('/api/client/orders'), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      throw new Error(await parseErrorMessage(response));
    }

    return (await response.json()) as CreateOrderResponse;
  }
};
