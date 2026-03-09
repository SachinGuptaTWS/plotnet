import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Booking } from '../../../models/booking.model';
import { BookingService } from '../../../core/services/booking.service';

@Component({
  selector: 'app-manage-bookings',
  standalone: false,
  templateUrl: './manage-bookings.component.html',
})
export class ManageBookingsComponent implements OnInit {
  bookings: Booking[] = [];
  filtered: Booking[] = [];
  loading = true;
  readonly skeletonRows = [1, 2, 3, 4];
  error = '';
  activeFilter: 'ALL' | 'PENDING' | 'CONFIRMED' | 'CANCELLED' = 'ALL';
  processingId: number | null = null;
  filters: { value: 'ALL' | 'PENDING' | 'CONFIRMED' | 'CANCELLED'; label: string }[] = [
    { value: 'ALL', label: 'All' },
    { value: 'PENDING', label: 'Pending' },
    { value: 'CONFIRMED', label: 'Confirmed' },
    { value: 'CANCELLED', label: 'Cancelled' },
  ];

  constructor(
    private bookingService: BookingService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.load();
  }

  load(): void {
    this.loading = true;
    this.bookingService.getAll().subscribe({
      next: (data) => {
        this.bookings = data;
        this.applyFilter(this.activeFilter);
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: () => { this.error = 'Could not load bookings.'; this.loading = false; this.cdr.detectChanges(); }
    });
  }

  applyFilter(status: 'ALL' | 'PENDING' | 'CONFIRMED' | 'CANCELLED'): void {
    this.activeFilter = status;
    this.filtered = status === 'ALL'
      ? this.bookings
      : this.bookings.filter(b => b.status === status);
  }

  updateStatus(id: number, status: 'CONFIRMED' | 'CANCELLED'): void {
    this.processingId = id;
    this.bookingService.updateStatus(id, status).subscribe({
      next: () => { this.processingId = null; this.load(); },
      error: () => { this.processingId = null; }
    });
  }

  exportCsv(): void {
    const headers = ['Booking ID', 'User', 'Email', 'Plot', 'Location', 'Amount (INR)', 'Booking Date', 'Status'];
    const rows = this.filtered.map(b => [
      b.id,
      `"${b.userName ?? ''}"`,
      `"${b.userEmail ?? ''}"`,
      `"${b.plotTitle}"`,
      `"${b.plotLocation}"`,
      b.plotPrice,
      new Date(b.bookingDate).toLocaleDateString('en-IN'),
      b.status,
    ]);
    const csvContent = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `bookings_${this.activeFilter.toLowerCase()}_${new Date().toISOString().slice(0, 10)}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  }

  formatPrice(price: number): string {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency', currency: 'INR', maximumFractionDigits: 0
    }).format(price);
  }
}
