import { Component, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-register',
  standalone: false,
  templateUrl: './register.component.html',
})
export class RegisterComponent {
  form: FormGroup;
  loading = false;
  /** Shown after successful signup (toast also fires). */
  registerSuccess = false;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private toastr: ToastrService,
    private cdr: ChangeDetectorRef
  ) {
    this.form = this.fb.group({
      fullName:   ['', [Validators.required, Validators.minLength(2)]],
      email:      ['', [Validators.required, Validators.email]],
      password:   ['', [Validators.required, Validators.minLength(8)]],
      reraNumber: ['', [Validators.required]],
      leaderName: ['', [Validators.required]],
      teamName:   ['', [Validators.required]],
    });
  }

  get fullName()   { return this.form.get('fullName')!; }
  get email()      { return this.form.get('email')!; }
  get password()   { return this.form.get('password')!; }
  get reraNumber() { return this.form.get('reraNumber')!; }
  get leaderName() { return this.form.get('leaderName')!; }
  get teamName()   { return this.form.get('teamName')!; }

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.loading = true;
    this.registerSuccess = false;

    this.auth.register(this.form.value).subscribe({
      next: () => {
        this.loading = false;
        this.toastr.success(
          'Account created. Awaiting administrator verification before you can sign in.'
        );
        this.registerSuccess = true;
        this.form.reset();
        this.cdr.detectChanges();
      },
      error: (err) => {
        this.loading = false;
        const msg =
          typeof err?.error?.message === 'string'
            ? err.error.message
            : typeof err?.error === 'string'
              ? err.error
              : 'Registration failed. Please try again.';
        this.toastr.error(msg);
        this.cdr.detectChanges();
      }
    });
  }
}
