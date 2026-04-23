import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import OrderDetailTable from '../../components/order/OrderDetailTable/OrderDetailTable';
import ReorderButton from '../../components/order/ReorderButton/ReorderButton';
import { orderService } from '../../services/orderService';
import { useAuthStore } from '../../store/authStore';
import type { OrderDetail } from '../../types/order.types';
import { cartStorage } from '../../utils/cartStorage';
import './OrderDetailPage.css';

function OrderDetailPage() {
  const { id } = useParams();
  const { token } = useAuthStore();
  const [order, setOrder] = useState<OrderDetail | null>(null);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadOrderDetail = async () => {
      if (!id) {
        setErrorMessage('Order not found.');
        setIsLoading(false);
        return;
      }

      if (!token) {
        setErrorMessage('Please login to view order details.');
        setIsLoading(false);
        return;
      }

      try {
        const detail = await orderService.fetchClientOrderById(id, token);
        if (!detail) {
          setErrorMessage('Order not found.');
          return;
        }

        setOrder(detail);
      } catch (error) {
        const fallback = 'Unable to load order detail.';
        setErrorMessage(error instanceof Error ? error.message : fallback);
      } finally {
        setIsLoading(false);
      }
    };

    void loadOrderDetail();
  }, [id, token]);

  if (isLoading) {
    return (
      <main className="order-detail-page">
        <p>Loading order detail...</p>
      </main>
    );
  }

  if (!order) {
    return (
      <main className="order-detail-page">
        <p>{errorMessage || 'Order not found.'}</p>
      </main>
    );
  }

  const handleReorder = () => {
    const reorderItems = order.items.map((item) => ({
      productId: String(item.productId),
      quantity: item.quantity
    }));

    reorderItems.forEach((item) => {
      cartStorage.addToCart(item.productId, item.quantity);
    });

    setSuccessMessage('Items from this order were added to your cart.');
  };

  return (
    <main className="order-detail-page">
      <h1>Order Detail</h1>
      <div className="order-detail-page__meta">
        <p>
          <strong>Order ID:</strong> {order.orderId}
        </p>
        <p>
          <strong>Order Date:</strong> {order.orderDate}
        </p>
        <p>
          <strong>Status:</strong> {order.status}
        </p>
      </div>

      <OrderDetailTable items={order.items} />

      <p className="order-detail-page__total">
        <strong>Total:</strong> VND {order.totalAmount.toFixed(2)}
      </p>

      <ReorderButton disabled={order.items.length === 0} onClick={handleReorder} />

      {successMessage ? <p className="order-detail-page__success">{successMessage}</p> : null}

      <p className="order-detail-page__back-link">
        <Link to="/my-orders">Back to My Orders</Link>
      </p>
    </main>
  );
}

export default OrderDetailPage;
