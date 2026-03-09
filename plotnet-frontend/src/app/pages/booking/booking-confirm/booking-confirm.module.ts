import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../../shared/shared.module';
import { BookingConfirmComponent } from './booking-confirm.component';
// DatePipe is provided by CommonModule

@NgModule({
  declarations: [BookingConfirmComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([{ path: '', component: BookingConfirmComponent }]),
    SharedModule,
  ]
})
export class BookingConfirmModule {}
