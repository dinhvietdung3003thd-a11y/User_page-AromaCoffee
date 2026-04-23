import { useEffect, useState } from 'react';
import OrderList from '../../components/order/OrderList/OrderList';
import { orderService } from '../../services/orderService';
import { useAuthStore } from '../../store/authStore';
import type { OrderSummary } from '../../types/order.types';
import './MyOrdersPage.css';

function MyOrdersPage() {
  const { token } = useAuthStore();
  const [orders, setOrders] = useState<OrderSummary[]>([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadOrders = async () => {
      if (!token) {
        setErrorMessage('Please login to view your orders.');
        setIsLoading(false);
        return;
      }

      try {
        const data = await orderService.fetchClientOrders(token);
        setOrders(data);
      } catch (error) {
        const fallback = 'Unable to load your orders.';
        setErrorMessage(error instanceof Error ? error.message : fallback);
      } finally {
        setIsLoading(false);
      }
    };

    void loadOrders();
  }, [token]);

  return (
    <main className="my-orders-page">
      <h1>My Orders</h1>
      {isLoading ? <p>Loading orders...</p> : null}
      {errorMessage ? <p>{errorMessage}</p> : null}
      {!isLoading && !errorMessage ? <OrderList orders={orders} /> : null}
    </main>
  );
}

export default MyOrdersPage;
