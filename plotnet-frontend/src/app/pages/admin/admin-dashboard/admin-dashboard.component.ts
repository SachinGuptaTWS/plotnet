import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { AdminService, DashboardStats } from '../../../core/services/admin.service';
import { BookingService } from '../../../core/services/booking.service';
import { Booking } from '../../../models/booking.model';

@Component({
  selector: 'app-admin-dashboard',
  standalone: false,
  templateUrl: './admin-dashboard.component.html',
})
export class AdminDashboardComponent implements OnInit {
  stats: DashboardStats | null = null;
  recentBookings: Booking[] = [];
  loadingStats = true;
  loadingBookings = true;
  today = new Date();
  readonly skeletonRows = [1, 2, 3, 4];

  constructor(
    private adminService: AdminService,
    private bookingService: BookingService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.adminService.getDashboardStats().subscribe({
      next: (data) => { this.stats = data; this.loadingStats = false; this.cdr.detectChanges(); },
      error: () => { this.loadingStats = false; this.cdr.detectChanges(); }
    });

    this.bookingService.getAll().subscribe({
      next: (data) => { this.recentBookings = data.slice(0, 8); this.loadingBookings = false; this.cdr.detectChanges(); },
      error: () => { this.loadingBookings = false; this.cdr.detectChanges(); }
    });
  }

  formatPrice(price: number): string {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency', currency: 'INR', maximumFractionDigits: 0
    }).format(price);
  }
}
