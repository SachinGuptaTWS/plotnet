import { Component, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';
import { User } from '../../../models/user.model';

@Component({
  selector: 'app-profile',
  standalone: false,
  templateUrl: './profile.component.html',
})
export class ProfileComponent {
  user: User | null;
  editMode = false;
  editForm: FormGroup;
  saving = false;
  saveError = '';
  saveSuccess = '';

  constructor(
    private auth: AuthService,
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef
  ) {
    this.user = this.auth.getUser();
    this.editForm = this.fb.group({
      fullName:   [this.user?.fullName   ?? '', [Validators.required, Validators.minLength(2)]],
      teamName:   [this.user?.teamName   ?? '', [Validators.required]],
      leaderName: [this.user?.leaderName ?? '', [Validators.required]],
    });
  }

  startEdit(): void {
    this.editForm.patchValue({
      fullName:   this.user?.fullName   ?? '',
      teamName:   this.user?.teamName   ?? '',
      leaderName: this.user?.leaderName ?? '',
    });
    this.saveError = '';
    this.saveSuccess = '';
    this.editMode = true;
  }

  cancelEdit(): void {
    this.editMode = false;
    this.saveError = '';
  }

  saveProfile(): void {
    if (this.editForm.invalid) {
      this.editForm.markAllAsTouched();
      return;
    }
    this.saving = true;
    this.saveError = '';
    this.saveSuccess = '';

    this.auth.updateProfile(this.editForm.value).subscribe({
      next: () => {
        this.saving = false;
        this.user = this.auth.getUser();
        this.editMode = false;
        this.saveSuccess = 'Profile updated successfully.';
        this.cdr.detectChanges();
        setTimeout(() => { this.saveSuccess = ''; this.cdr.detectChanges(); }, 4000);
      },
      error: (err) => {
        this.saving = false;
        this.saveError = err?.error?.message ?? 'Update failed. Please try again.';
        this.cdr.detectChanges();
      }
    });
  }
}
