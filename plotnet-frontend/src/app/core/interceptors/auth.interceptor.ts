import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const auth   = inject(AuthService);
  const router = inject(Router);
  const zone   = inject(NgZone);
  const token  = auth.getToken();

  const cloned = token
    ? req.clone({ setHeaders: { Authorization: `Bearer ${token}` } })
    : req;

  // Wrap every emission in NgZone.run() so Angular change detection always fires,
  // regardless of whether Zone.js patches XHR/fetch correctly in this build environment.
  return new Observable(observer => {
    const sub = next(cloned).subscribe({
      next:     (val) => zone.run(() => observer.next(val)),
      error:    (err) => {
        if (err instanceof HttpErrorResponse && err.status === 401) {
          zone.run(() => { auth.logout(); router.navigate(['/login']); });
        }
        zone.run(() => observer.error(err));
      },
      complete: ()    => zone.run(() => observer.complete()),
    });
    return () => sub.unsubscribe();
  });
};
