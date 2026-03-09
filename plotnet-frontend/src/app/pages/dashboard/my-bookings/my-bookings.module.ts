import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../../shared/shared.module';
import { MyBookingsComponent } from './my-bookings.component';

@NgModule({
  declarations: [MyBookingsComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([{ path: '', component: MyBookingsComponent }]),
    SharedModule,
  ]
})
export class MyBookingsModule {}
