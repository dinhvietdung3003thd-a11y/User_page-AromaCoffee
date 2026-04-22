export interface OrderSummary {
  id: string;
  totalAmount: number;
  status: 'pending' | 'paid' | 'completed' | 'cancelled';
}
