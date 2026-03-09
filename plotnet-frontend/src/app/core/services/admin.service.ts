import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../../models/user.model';

export interface DashboardStats {
  totalPlots: number;
  availablePlots: number;
  totalBookings: number;
  totalRevenue: number;
}

const API_BASE = 'http://localhost:8080/api';

@Injectable({ providedIn: 'root' })
export class AdminService {

  constructor(private http: HttpClient) {}

  getDashboardStats(): Observable<DashboardStats> {
    return this.http.get<DashboardStats>(`${API_BASE}/admin/dashboard`);
  }

  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${API_BASE}/admin/users`);
  }

  verifyUser(id: number, status: 'APPROVED' | 'REJECTED'): Observable<User> {
    return this.http.patch<User>(`${API_BASE}/admin/users/${id}/verify`, { status });
  }
}
