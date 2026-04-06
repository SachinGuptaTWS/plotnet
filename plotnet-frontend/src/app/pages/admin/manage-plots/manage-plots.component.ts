import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Plot } from '../../../models/plot.model';
import { PlotService } from '../../../core/services/plot.service';

@Component({
  selector: 'app-manage-plots',
  standalone: false,
  templateUrl: './manage-plots.component.html',
})
export class ManagePlotsComponent implements OnInit {
  plots: Plot[] = [];
  loading = true;
  readonly skeletonRows = [1, 2, 3, 4, 5];
  error = '';

  panelOpen = false;
  editingPlot: Plot | null = null;
  form: FormGroup;
  saving = false;
  formError = '';

  deletingId: number | null = null;

  constructor(
    private plotService: PlotService,
    private fb: FormBuilder,
    private toastr: ToastrService,
    private cdr: ChangeDetectorRef
  ) {
    this.form = this.fb.group({
      title:       ['', Validators.required],
      location:    ['', Validators.required],
      area:        ['', [Validators.required, Validators.min(1)]],
      price:       ['', [Validators.required, Validators.min(1)]],
      reraNumber:  [''],
      description: [''],
      imageUrl:    [''],
      status:      ['AVAILABLE', Validators.required],
    });
  }

  ngOnInit(): void {
    this.loadPlots();
  }

  loadPlots(): void {
    this.loading = true;
    this.plotService.getAll().subscribe({
      next: (data) => { this.plots = data; this.loading = false; this.cdr.detectChanges(); },
      error: () => { this.error = 'Could not load plots.'; this.loading = false; this.cdr.detectChanges(); }
    });
  }

  openAdd(): void {
    this.editingPlot = null;
    this.form.reset({ status: 'AVAILABLE' });
    this.formError = '';
    this.panelOpen = true;
  }

  openEdit(plot: Plot): void {
    this.editingPlot = plot;
    this.form.patchValue({
      title:       plot.title,
      location:    plot.location,
      area:        plot.area,
      price:       plot.price,
      reraNumber:  plot.reraNumber ?? '',
      description: plot.description,
      imageUrl:    plot.imageUrl ?? '',
      status:      plot.status,
    });
    this.formError = '';
    this.panelOpen = true;
  }

  closePanel(): void {
    this.panelOpen = false;
    this.editingPlot = null;
  }

  save(): void {
    if (this.form.invalid) { this.form.markAllAsTouched(); return; }

    this.saving = true;
    this.formError = '';
    const payload = this.form.value;

    const request = this.editingPlot
      ? this.plotService.update(this.editingPlot.id, payload)
      : this.plotService.create(payload);

    request.subscribe({
      next: () => {
        this.saving = false;
        this.toastr.success(this.editingPlot ? 'Plot updated.' : 'Plot added.');
        this.closePanel();
        this.loadPlots();
        this.cdr.detectChanges();
      },
      error: (err) => {
        this.saving = false;
        const msg =
          typeof err?.error?.message === 'string'
            ? err.error.message
            : typeof err?.error === 'string'
              ? err.error
              : 'Save failed.';
        this.formError = msg;
        this.toastr.error(msg);
        this.cdr.detectChanges();
      }
    });
  }

  delete(id: number): void {
    if (!confirm('Delete this plot? This action cannot be undone.')) return;
    this.deletingId = id;
    this.plotService.delete(id).subscribe({
      next: () => { this.deletingId = null; this.loadPlots(); },
      error: () => { this.deletingId = null; }
    });
  }

  exportCsv(): void {
    const headers = ['Plot ID', 'Title', 'Location', 'RERA', 'Area (sq ft)', 'Price (INR)', 'Status', 'Listed On'];
    const rows = this.plots.map(p => [
      p.id,
      `"${p.title}"`,
      `"${p.location}"`,
      `"${(p.reraNumber ?? '').replace(/"/g, '""')}"`,
      p.area,
      p.price,
      p.status,
      new Date(p.createdAt).toLocaleDateString('en-IN'),
    ]);
    const csvContent = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `plots_${new Date().toISOString().slice(0, 10)}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  }

  formatPrice(price: number): string {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency', currency: 'INR', maximumFractionDigits: 0
    }).format(price);
  }
}
