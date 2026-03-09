import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';
import { AdminGuard } from './core/guards/admin.guard';

const routes: Routes = [
  { path: '', redirectTo: 'plots', pathMatch: 'full' },

  {
    path: 'login',
    loadChildren: () => import('./pages/auth/login/login.module').then(m => m.LoginModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./pages/auth/register/register.module').then(m => m.RegisterModule)
  },
  {
    path: 'plots',
    loadChildren: () => import('./pages/plots/plot-list/plot-list.module').then(m => m.PlotListModule)
  },
  {
    path: 'plots/:id',
    loadChildren: () => import('./pages/plots/plot-detail/plot-detail.module').then(m => m.PlotDetailModule)
  },
  {
    path: 'booking/confirm/:id',
    canActivate: [AuthGuard],
    loadChildren: () => import('./pages/booking/booking-confirm/booking-confirm.module').then(m => m.BookingConfirmModule)
  },
  {
    path: 'booking/payment/:bookingId',
    canActivate: [AuthGuard],
    loadChildren: () => import('./pages/booking/payment/payment.module').then(m => m.PaymentModule)
  },
  {
    path: 'booking/success',
    canActivate: [AuthGuard],
    loadChildren: () => import('./pages/booking/booking-success/booking-success.module').then(m => m.BookingSuccessModule)
  },
  {
    path: 'dashboard/bookings',
    canActivate: [AuthGuard],
    loadChildren: () => import('./pages/dashboard/my-bookings/my-bookings.module').then(m => m.MyBookingsModule)
  },
  {
    path: 'dashboard/profile',
    canActivate: [AuthGuard],
    loadChildren: () => import('./pages/dashboard/profile/profile.module').then(m => m.ProfileModule)
  },
  {
    path: 'admin',
    canActivate: [AdminGuard],
    loadChildren: () => import('./pages/admin/admin-dashboard/admin-dashboard.module').then(m => m.AdminDashboardModule)
  },
  {
    path: 'admin/plots',
    canActivate: [AdminGuard],
    loadChildren: () => import('./pages/admin/manage-plots/manage-plots.module').then(m => m.ManagePlotsModule)
  },
  {
    path: 'admin/bookings',
    canActivate: [AdminGuard],
    loadChildren: () => import('./pages/admin/manage-bookings/manage-bookings.module').then(m => m.ManageBookingsModule)
  },
  {
    path: 'admin/users',
    canActivate: [AdminGuard],
    loadChildren: () => import('./pages/admin/manage-users/manage-users.module').then(m => m.ManageUsersModule)
  },
  { path: '**', redirectTo: 'plots' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
