import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../../shared/shared.module';
import { BookingSuccessComponent } from './booking-success.component';

@NgModule({
  declarations: [BookingSuccessComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([{ path: '', component: BookingSuccessComponent }]),
    SharedModule,
  ]
})
export class BookingSuccessModule {}
