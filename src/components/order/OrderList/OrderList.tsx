import type { OrderSummary } from '../../../types/order.types';
import OrderCard from '../OrderCard/OrderCard';
import './OrderList.css';

interface OrderListProps {
  orders: OrderSummary[];
}

function OrderList({ orders }: OrderListProps) {
  if (orders.length === 0) {
    return <p>No orders found.</p>;
  }

  return (
    <section className="order-list">
      {orders.map((order) => (
        <OrderCard key={order.orderId} order={order} />
      ))}
    </section>
  );
}

export default OrderList;
