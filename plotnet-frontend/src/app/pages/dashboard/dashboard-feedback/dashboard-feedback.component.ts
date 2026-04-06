import { Component, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../../core/services/auth.service';
import { FeedbackService } from '../../../core/services/feedback.service';
import { User } from '../../../models/user.model';

@Component({
  selector: 'app-dashboard-feedback',
  standalone: false,
  templateUrl: './dashboard-feedback.component.html',
})
export class DashboardFeedbackComponent {
  user: User | null;
  form: FormGroup;
  submitting = false;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private feedbackService: FeedbackService,
    private toastr: ToastrService,
    private cdr: ChangeDetectorRef
  ) {
    this.user = this.auth.getUser();
    this.form = this.fb.group({
      body: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(2000)]],
    });
  }

  get canSubmit(): boolean {
    return this.user?.status === 'APPROVED' && this.user?.role === 'ASSOCIATE';
  }

  submit(): void {
    if (!this.canSubmit) return;
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.submitting = true;
    const body = this.form.get('body')!.value as string;
    this.feedbackService.submit(body.trim()).subscribe({
      next: () => {
        this.submitting = false;
        this.form.reset();
        this.toastr.success('Thank you. Your review is visible to everyone on the Reviews page.');
        this.cdr.detectChanges();
      },
      error: (err) => {
        this.submitting = false;
        const msg =
          typeof err?.error?.message === 'string'
            ? err.error.message
            : 'Could not submit feedback.';
        this.toastr.error(msg);
        this.cdr.detectChanges();
      },
    });
  }
}
