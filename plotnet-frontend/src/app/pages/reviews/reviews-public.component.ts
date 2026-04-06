import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FeedbackItem } from '../../models/feedback.model';
import { FeedbackService } from '../../core/services/feedback.service';

@Component({
  selector: 'app-reviews-public',
  standalone: false,
  templateUrl: './reviews-public.component.html',
})
export class ReviewsPublicComponent implements OnInit {
  items: FeedbackItem[] = [];
  loading = true;
  error = '';

  constructor(
    private feedbackService: FeedbackService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.feedbackService.getPublic().subscribe({
      next: (data) => {
        this.items = data;
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: () => {
        this.error = 'Could not load reviews.';
        this.loading = false;
        this.cdr.detectChanges();
      }
    });
  }

  formatDate(iso: string): string {
    try {
      return new Date(iso).toLocaleString('en-IN', {
        dateStyle: 'medium',
        timeStyle: 'short',
      });
    } catch {
      return iso;
    }
  }
}
