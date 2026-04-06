import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FeedbackItem } from '../../models/feedback.model';

const API_BASE = 'http://localhost:8080/api';

@Injectable({ providedIn: 'root' })
export class FeedbackService {

  constructor(private http: HttpClient) {}

  getPublic(): Observable<FeedbackItem[]> {
    return this.http.get<FeedbackItem[]>(`${API_BASE}/feedback`);
  }

  submit(body: string): Observable<FeedbackItem> {
    return this.http.post<FeedbackItem>(`${API_BASE}/feedback`, { body });
  }

  getAdmin(): Observable<FeedbackItem[]> {
    return this.http.get<FeedbackItem[]>(`${API_BASE}/admin/feedback`);
  }

  reply(feedbackId: number, reply: string): Observable<FeedbackItem> {
    return this.http.patch<FeedbackItem>(
      `${API_BASE}/admin/feedback/${feedbackId}/reply`,
      { reply }
    );
  }
}
