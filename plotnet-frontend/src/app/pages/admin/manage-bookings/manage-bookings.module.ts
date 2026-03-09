import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../../shared/shared.module';
import { ManageBookingsComponent } from './manage-bookings.component';

@NgModule({
  declarations: [ManageBookingsComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([{ path: '', component: ManageBookingsComponent }]),
    SharedModule,
  ]
})
export class ManageBookingsModule {}
