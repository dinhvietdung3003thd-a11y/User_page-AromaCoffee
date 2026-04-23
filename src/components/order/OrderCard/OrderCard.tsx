import { Link } from 'react-router-dom';
import type { OrderSummary } from '../../../types/order.types';
import './OrderCard.css';

interface OrderCardProps {
  order: OrderSummary;
}

function OrderCard({ order }: OrderCardProps) {
  return (
    <article className="order-card">
      <div className="order-card__info">
        <p>
          <strong>Order ID:</strong> {order.orderId}
        </p>
        <p>
          <strong>Date:</strong> {order.orderDate}
        </p>
        <p>
          <strong>Status:</strong> {order.status}
        </p>
        <p>
          <strong>Total:</strong> USD {order.totalAmount.toFixed(2)}
        </p>
      </div>
      <Link className="order-card__button" to={`/my-orders/${order.orderId}`}>
        View Detail
      </Link>
    </article>
  );
}

export default OrderCard;
