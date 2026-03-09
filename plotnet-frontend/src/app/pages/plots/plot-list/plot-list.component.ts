import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Plot } from '../../../models/plot.model';
import { PlotService, PlotFilter } from '../../../core/services/plot.service';

@Component({
  selector: 'app-plot-list',
  standalone: false,
  templateUrl: './plot-list.component.html',
})
export class PlotListComponent implements OnInit {
  plots: Plot[] = [];
  loading = true;
  error = '';
  readonly skeletonRows = [1, 2, 3, 4, 5, 6];
  filterForm: FormGroup;

  constructor(
    private plotService: PlotService,
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef
  ) {
    this.filterForm = this.fb.group({
      location: [''],
      minArea:  [''],
      maxArea:  [''],
      minPrice: [''],
      maxPrice: [''],
    });
  }

  ngOnInit(): void {
    this.loadPlots();
  }

  loadPlots(filters?: PlotFilter): void {
    this.loading = true;
    this.error = '';
    this.plotService.getAll(filters).subscribe({
      next: (data) => {
        this.plots = data;
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: () => {
        this.error = 'Could not load plots. Please try again.';
        this.loading = false;
        this.cdr.detectChanges();
      }
    });
  }

  applyFilters(): void {
    const raw = this.filterForm.value;
    const filters: PlotFilter = {};
    if (raw.location?.trim()) filters.location = raw.location.trim();
    if (raw.minArea)          filters.minArea  = +raw.minArea;
    if (raw.maxArea)          filters.maxArea  = +raw.maxArea;
    if (raw.minPrice)         filters.minPrice = +raw.minPrice;
    if (raw.maxPrice)         filters.maxPrice = +raw.maxPrice;
    this.loadPlots(filters);
  }

  clearFilters(): void {
    this.filterForm.reset();
    this.loadPlots();
  }

  formatPrice(price: number): string {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(price);
  }
}
