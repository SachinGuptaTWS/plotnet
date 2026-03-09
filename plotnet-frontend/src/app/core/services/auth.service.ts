import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { User, UserRole } from '../../models/user.model';

interface LoginRequest {
  email: string;
  password: string;
}

interface LoginResponse {
  token: string;
  user: User;
}

interface SignUpRequest {
  fullName: string;
  email: string;
  password: string;
  reraNumber: string;
  leaderName: string;
  teamName: string;
}

const API_BASE = 'http://localhost:8080/api';
const TOKEN_KEY = 'plotnet_token';
const USER_KEY  = 'plotnet_user';

@Injectable({ providedIn: 'root' })
export class AuthService {

  constructor(private http: HttpClient) {}

  register(payload: SignUpRequest): Observable<{ message: string }> {
    return this.http.post<{ message: string }>(`${API_BASE}/auth/signup`, payload);
  }

  login(payload: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${API_BASE}/auth/login`, payload).pipe(
      tap(res => {
        localStorage.setItem(TOKEN_KEY, res.token);
        localStorage.setItem(USER_KEY, JSON.stringify(res.user));
      })
    );
  }

  logout(): void {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
  }

  getToken(): string | null {
    return localStorage.getItem(TOKEN_KEY);
  }

  getUser(): User | null {
    const raw = localStorage.getItem(USER_KEY);
    return raw ? JSON.parse(raw) as User : null;
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  getRole(): UserRole | null {
    return this.getUser()?.role ?? null;
  }

  isAdmin(): boolean {
    return this.getRole() === 'ADMIN';
  }

  updateProfile(data: { fullName: string; teamName: string; leaderName: string }): Observable<User> {
    return this.http.put<User>(`${API_BASE}/users/profile`, data).pipe(
      tap(updated => {
        const current = this.getUser();
        if (current) {
          const merged = { ...current, ...updated };
          localStorage.setItem(USER_KEY, JSON.stringify(merged));
        }
      })
    );
  }
}
