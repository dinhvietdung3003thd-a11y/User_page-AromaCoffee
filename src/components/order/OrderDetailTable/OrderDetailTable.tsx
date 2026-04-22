import type { OrderItem } from '../../../types/order.types';
import './OrderDetailTable.css';

interface OrderDetailTableProps {
  items: OrderItem[];
}

function OrderDetailTable({ items }: OrderDetailTableProps) {
  return (
    <table className="order-detail-table">
      <thead>
        <tr>
          <th>Product Name</th>
          <th>Quantity</th>
          <th>Unit Price</th>
          <th>Subtotal</th>
        </tr>
      </thead>
      <tbody>
        {items.map((item) => (
          <tr key={item.productId}>
            <td>{item.productName}</td>
            <td>{item.quantity}</td>
            <td>USD {item.unitPrice.toFixed(2)}</td>
            <td>USD {item.subtotal.toFixed(2)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default OrderDetailTable;
