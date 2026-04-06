import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../../shared/shared.module';
import { ManageFeedbackComponent } from './manage-feedback.component';

@NgModule({
  declarations: [ManageFeedbackComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild([{ path: '', component: ManageFeedbackComponent }]),
    SharedModule,
  ],
})
export class ManageFeedbackModule {}
