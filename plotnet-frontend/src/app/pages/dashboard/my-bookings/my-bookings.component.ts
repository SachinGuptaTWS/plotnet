import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Booking } from '../../../models/booking.model';
import { BookingService } from '../../../core/services/booking.service';

interface ReceiptData {
  transactionId: string;
  plotTitle:     string;
  plotPrice:     number;
  paymentDate:   string;
}

@Component({
  selector: 'app-my-bookings',
  standalone: false,
  templateUrl: './my-bookings.component.html',
})
export class MyBookingsComponent implements OnInit {
  bookings: Booking[] = [];
  loading = true;
  error = '';
  cancellingId: number | null = null;
  readonly skeletonRows = [1, 2, 3, 4];

  activeReceipt: (ReceiptData & { bookingId: string | number }) | null = null;

  constructor(
    private bookingService: BookingService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.bookingService.getMyBookings().subscribe({
      next: (data) => {
        this.bookings = data;
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: () => {
        this.error = 'Could not load bookings.';
        this.loading = false;
        this.cdr.detectChanges();
      }
    });
  }

  cancelBooking(id: number): void {
    if (!confirm('Cancel this booking? This action cannot be undone.')) return;
    this.cancellingId = id;
    this.bookingService.cancelMyBooking(id).subscribe({
      next: (updated) => {
        this.cancellingId = null;
        const idx = this.bookings.findIndex(b => b.id === id);
        if (idx !== -1) this.bookings[idx] = updated;
      },
      error: () => {
        this.cancellingId = null;
        this.error = 'Could not cancel booking. Please try again.';
      }
    });
  }

  hasReceipt(booking: Booking): boolean {
    // Receipt available if payment was recorded server-side OR stored locally
    return booking.paymentStatus === 'SUCCESS'
      || !!localStorage.getItem(`plotnet_receipt_${booking.id}`);
  }

  printReceipt(booking: Booking): void {
    // Prefer server-side data; fall back to localStorage (legacy / offline)
    if (booking.paymentStatus === 'SUCCESS' && booking.transactionId) {
      this.activeReceipt = {
        bookingId:     booking.id,
        plotTitle:     booking.plotTitle,
        plotPrice:     booking.plotPrice,
        transactionId: booking.transactionId,
        paymentDate:   booking.paymentDate ?? new Date().toISOString(),
      };
      setTimeout(() => window.print(), 100);
      return;
    }
    const raw = localStorage.getItem(`plotnet_receipt_${booking.id}`);
    if (!raw) return;
    const data: ReceiptData = JSON.parse(raw);
    this.activeReceipt = { ...data, bookingId: booking.id };
    setTimeout(() => window.print(), 100);
  }

  formatPrice(price: number): string {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency', currency: 'INR', maximumFractionDigits: 0
    }).format(price);
  }

  formatDate(iso: string): string {
    return new Date(iso).toLocaleDateString('en-IN', {
      day: '2-digit', month: 'short', year: 'numeric'
    });
  }
}
