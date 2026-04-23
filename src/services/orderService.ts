import { appConfig } from '../config/appConfig';
import type { OrderDetail, OrderItem, OrderSummary } from '../types/order.types';

interface ApiOrderDetailItem {
  orderDetailId: number;
  productId: number;
  productName: string;
  quantity: number;
  unitPrice: number;
  subtotal: number;
}

interface ApiClientOrder {
  id: number;
  orderDate: string;
  totalAmount: number;
  tableId: number | null;
  status: string;
  creatorFullName: string | null;
  userId: number | null;
  customerId: number;
  details: ApiOrderDetailItem[];
}

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

const resolveApiUrl = (path: string) => `${appConfig.apiBaseUrl}${path}`;

const parseErrorMessage = async (response: Response, fallback: string): Promise<string> => {
  try {
    const data = (await response.json()) as { message?: string; error?: string; title?: string };
    return data.message || data.error || data.title || fallback;
  } catch {
    return fallback;
  }
};

const mapOrderItem = (item: ApiOrderDetailItem): OrderItem => ({
  productId: String(item.productId),
  productName: item.productName,
  quantity: item.quantity,
  unitPrice: item.unitPrice,
  subtotal: item.subtotal
});

const mapOrderSummary = (order: ApiClientOrder): OrderSummary => ({
  orderId: String(order.id),
  orderDate: order.orderDate,
  status: order.status,
  totalAmount: order.totalAmount
});

const mapOrderDetail = (order: ApiClientOrder): OrderDetail => ({
  ...mapOrderSummary(order),
  items: order.details.map(mapOrderItem)
});

export const orderService = {
  async fetchClientOrders(token: string): Promise<OrderSummary[]> {
    const response = await fetch(resolveApiUrl('/api/client/orders'), {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    if (!response.ok) {
      throw new Error(await parseErrorMessage(response, 'Unable to load orders.'));
    }

    const data = (await response.json()) as ApiClientOrder[];
    return data.map(mapOrderSummary);
  },

  async fetchClientOrderById(orderId: string, token: string): Promise<OrderDetail | null> {
    const response = await fetch(resolveApiUrl(`/api/client/orders/${orderId}`), {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    if (response.status === 404) {
      return null;
    }

    if (!response.ok) {
      throw new Error(await parseErrorMessage(response, 'Unable to load order detail.'));
    }

    const data = (await response.json()) as ApiClientOrder;
    return mapOrderDetail(data);
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
      throw new Error(await parseErrorMessage(response, 'Unable to create order. Please try again.'));
    }

    return (await response.json()) as CreateOrderResponse;
  }
};
