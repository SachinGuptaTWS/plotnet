import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Plot } from '../../../models/plot.model';
import { PlotService } from '../../../core/services/plot.service';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-plot-detail',
  standalone: false,
  templateUrl: './plot-detail.component.html',
})
export class PlotDetailComponent implements OnInit {
  plot: Plot | null = null;
  loading = true;
  error = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private plotService: PlotService,
    public auth: AuthService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.plotService.getById(id).subscribe({
      next: (data) => {
        this.plot = data;
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: () => {
        this.error = 'Plot not found or could not be loaded.';
        this.loading = false;
        this.cdr.detectChanges();
      }
    });
  }

  bookPlot(): void {
    if (!this.auth.isLoggedIn()) {
      this.router.navigate(['/login']);
      return;
    }
    this.router.navigate(['/booking/confirm', this.plot?.id]);
  }

  formatPrice(price: number): string {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(price);
  }
}
