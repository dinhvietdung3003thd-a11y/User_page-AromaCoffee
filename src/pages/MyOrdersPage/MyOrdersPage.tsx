import OrderList from '../../components/order/OrderList/OrderList';
import { orderService } from '../../services/orderService';
import './MyOrdersPage.css';

function MyOrdersPage() {
  const orders = orderService.getOrders();

  return (
    <main className="my-orders-page">
      <h1>My Orders</h1>
      <OrderList orders={orders} />
    </main>
  );
}

export default MyOrdersPage;
