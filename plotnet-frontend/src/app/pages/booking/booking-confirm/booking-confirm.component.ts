import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Plot } from '../../../models/plot.model';
import { User } from '../../../models/user.model';
import { PlotService } from '../../../core/services/plot.service';
import { BookingService } from '../../../core/services/booking.service';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-booking-confirm',
  standalone: false,
  templateUrl: './booking-confirm.component.html',
})
export class BookingConfirmComponent implements OnInit {
  plot: Plot | null = null;
  user: User | null = null;
  loadingPlot = true;
  submitting = false;
  error = '';
  today = new Date();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private plotService: PlotService,
    private bookingService: BookingService,
    private auth: AuthService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.user = this.auth.getUser();
    const plotId = Number(this.route.snapshot.paramMap.get('id'));
    this.plotService.getById(plotId).subscribe({
      next: (data) => {
        this.plot = data;
        this.loadingPlot = false;
        if (data.status !== 'AVAILABLE') {
          this.error = 'This plot is no longer available for booking.';
        }
        this.cdr.detectChanges();
      },
      error: () => {
        this.error = 'Could not load plot details.';
        this.loadingPlot = false;
        this.cdr.detectChanges();
      }
    });
  }

  confirm(): void {
    if (!this.plot) return;
    this.submitting = true;
    this.error = '';

    this.bookingService.create(this.plot.id).subscribe({
      next: (booking) => {
        this.router.navigate(['/booking/payment', booking.id], {
          queryParams: {
            plotTitle: this.plot!.title,
            plotPrice: this.plot!.price
          }
        });
      },
      error: (err) => {
        this.submitting = false;
        this.error = err?.error?.message ?? 'Booking failed. Please try again.';
      }
    });
  }

  formatPrice(price: number): string {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency', currency: 'INR', maximumFractionDigits: 0
    }).format(price);
  }
}
