import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { User } from '../../../models/user.model';
import { AdminService } from '../../../core/services/admin.service';

@Component({
  selector: 'app-manage-users',
  standalone: false,
  templateUrl: './manage-users.component.html',
})
export class ManageUsersComponent implements OnInit {
  users: User[] = [];
  loading = true;
  readonly skeletonRows = [1, 2, 3, 4];
  error = '';
  processingId: number | null = null;

  constructor(
    private adminService: AdminService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.load();
  }

  load(): void {
    this.loading = true;
    this.adminService.getAllUsers().subscribe({
      next: (data) => { this.users = data; this.loading = false; this.cdr.detectChanges(); },
      error: () => { this.error = 'Could not load users.'; this.loading = false; this.cdr.detectChanges(); }
    });
  }

  verify(id: number, status: 'APPROVED' | 'REJECTED'): void {
    this.processingId = id;
    this.adminService.verifyUser(id, status).subscribe({
      next: () => { this.processingId = null; this.load(); },
      error: () => { this.processingId = null; }
    });
  }
}
