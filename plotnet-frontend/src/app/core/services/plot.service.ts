import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Plot } from '../../models/plot.model';

export interface PlotFilter {
  location?: string;
  minArea?:  number;
  maxArea?:  number;
  minPrice?: number;
  maxPrice?: number;
}

const API_BASE = 'http://localhost:8080/api';

@Injectable({ providedIn: 'root' })
export class PlotService {

  constructor(private http: HttpClient) {}

  getAll(filters?: PlotFilter): Observable<Plot[]> {
    let params = new HttpParams();
    if (filters?.location) params = params.set('location', filters.location);
    if (filters?.minArea)  params = params.set('minArea',  filters.minArea);
    if (filters?.maxArea)  params = params.set('maxArea',  filters.maxArea);
    if (filters?.minPrice) params = params.set('minPrice', filters.minPrice);
    if (filters?.maxPrice) params = params.set('maxPrice', filters.maxPrice);
    return this.http.get<Plot[]>(`${API_BASE}/plots`, { params });
  }

  getById(id: number): Observable<Plot> {
    return this.http.get<Plot>(`${API_BASE}/plots/${id}`);
  }

  create(plot: Partial<Plot>): Observable<Plot> {
    return this.http.post<Plot>(`${API_BASE}/admin/plots`, plot);
  }

  update(id: number, plot: Partial<Plot>): Observable<Plot> {
    return this.http.put<Plot>(`${API_BASE}/admin/plots/${id}`, plot);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${API_BASE}/admin/plots/${id}`);
  }
}
