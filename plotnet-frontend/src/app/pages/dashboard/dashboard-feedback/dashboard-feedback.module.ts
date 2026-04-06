import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../../shared/shared.module';
import { DashboardFeedbackComponent } from './dashboard-feedback.component';

@NgModule({
  declarations: [DashboardFeedbackComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild([{ path: '', component: DashboardFeedbackComponent }]),
    SharedModule,
  ],
})
export class DashboardFeedbackModule {}
