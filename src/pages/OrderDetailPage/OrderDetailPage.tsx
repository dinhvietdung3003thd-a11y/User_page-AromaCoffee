import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import OrderDetailTable from '../../components/order/OrderDetailTable/OrderDetailTable';
import ReorderButton from '../../components/order/ReorderButton/ReorderButton';
import { orderService } from '../../services/orderService';
import { cartStorage } from '../../utils/cartStorage';
import './OrderDetailPage.css';

function OrderDetailPage() {
  const { id } = useParams();
  const [successMessage, setSuccessMessage] = useState('');

  const order = id ? orderService.getOrderById(id) : null;

  if (!order) {
    return (
      <main className="order-detail-page">
        <p>Order not found.</p>
      </main>
    );
  }

  const handleReorder = () => {
    const reorderItems = order.items.map((item) => ({
      productId: item.productId,
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
        <strong>Total:</strong> USD {order.totalAmount.toFixed(2)}
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
