import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Booking } from '../../models/booking.model';
import { Payment } from '../../models/payment.model';

const API_BASE = 'http://localhost:8080/api';

@Injectable({ providedIn: 'root' })
export class BookingService {

  constructor(private http: HttpClient) {}

  create(plotId: number): Observable<Booking> {
    return this.http.post<Booking>(`${API_BASE}/bookings`, { plotId });
  }

  getMyBookings(): Observable<Booking[]> {
    return this.http.get<Booking[]>(`${API_BASE}/bookings/my`);
  }

  cancelMyBooking(id: number): Observable<Booking> {
    return this.http.patch<Booking>(`${API_BASE}/bookings/${id}/cancel`, {});
  }

  getAll(): Observable<Booking[]> {
    return this.http.get<Booking[]>(`${API_BASE}/admin/bookings`);
  }

  updateStatus(id: number, status: 'CONFIRMED' | 'CANCELLED'): Observable<Booking> {
    return this.http.patch<Booking>(`${API_BASE}/admin/bookings/${id}`, { status });
  }

  processPayment(bookingId: number, transactionId: string, amount: number): Observable<Payment> {
    return this.http.post<Payment>(`${API_BASE}/payments/verify`, {
      bookingId, transactionId, amount, status: 'SUCCESS'
    });
  }
}
