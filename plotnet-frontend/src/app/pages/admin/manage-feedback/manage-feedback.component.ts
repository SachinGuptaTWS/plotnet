import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { FeedbackItem } from '../../../models/feedback.model';
import { FeedbackService } from '../../../core/services/feedback.service';

@Component({
  selector: 'app-manage-feedback',
  standalone: false,
  templateUrl: './manage-feedback.component.html',
})
export class ManageFeedbackComponent implements OnInit {
  items: FeedbackItem[] = [];
  loading = true;
  error = '';
  readonly skeletonRows = [1, 2, 3, 4];
  replyForms = new Map<number, FormGroup>();
  savingId: number | null = null;

  constructor(
    private feedbackService: FeedbackService,
    private fb: FormBuilder,
    private toastr: ToastrService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.load();
  }

  load(): void {
    this.loading = true;
    this.error = '';
    this.feedbackService.getAdmin().subscribe({
      next: (data) => {
        this.items = data;
        this.replyForms.clear();
        for (const item of data) {
          this.replyForms.set(
            item.id,
            this.fb.group({
              reply: [item.adminReply ?? '', [Validators.required, Validators.maxLength(2000)]],
            })
          );
        }
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: () => {
        this.error = 'Could not load feedback.';
        this.loading = false;
        this.cdr.detectChanges();
      },
    });
  }

  replyForm(id: number): FormGroup {
    return this.replyForms.get(id)!;
  }

  submitReply(id: number): void {
    const fg = this.replyForms.get(id);
    if (!fg || fg.invalid) {
      fg?.markAllAsTouched();
      return;
    }
    const text = (fg.get('reply')!.value as string).trim();
    if (!text) return;

    this.savingId = id;
    this.feedbackService.reply(id, text).subscribe({
      next: (updated) => {
        this.savingId = null;
        const idx = this.items.findIndex((i) => i.id === id);
        if (idx >= 0) this.items[idx] = updated;
        fg.patchValue({ reply: updated.adminReply ?? '' });
        this.toastr.success('Reply saved. It is visible to everyone on the Reviews page.');
        this.cdr.detectChanges();
      },
      error: (err) => {
        this.savingId = null;
        const msg =
          typeof err?.error?.message === 'string'
            ? err.error.message
            : 'Could not save reply.';
        this.toastr.error(msg);
        this.cdr.detectChanges();
      },
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
