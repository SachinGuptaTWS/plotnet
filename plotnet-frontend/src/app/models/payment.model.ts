export type PaymentStatus = 'PENDING' | 'SUCCESS' | 'FAILED';

export interface Payment {
  id: number;
  bookingId: number;
  amount: number;
  status: PaymentStatus;
  transactionId?: string;
  paymentDate?: string;
}
