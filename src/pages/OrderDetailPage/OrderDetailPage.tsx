import { useParams } from 'react-router-dom';
import './OrderDetailPage.css';

function OrderDetailPage() {
  const { id } = useParams();

  return (
    <main className="order-detail-page">
      <h1>Order Detail</h1>
      <p>Placeholder page for order ID: {id}</p>
    </main>
  );
}

export default OrderDetailPage;
