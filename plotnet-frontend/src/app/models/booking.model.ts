export type BookingStatus = 'PENDING' | 'CONFIRMED' | 'CANCELLED';

export interface Booking {
  id: number;
  userId: number;
  plotId: number;
  plotTitle: string;
  plotLocation: string;
  plotPrice: number;
  bookingDate: string;
  status: BookingStatus;
  paymentStatus?: string;
  transactionId?: string;
  paymentDate?: string;
  userName?: string;
  userEmail?: string;
}
