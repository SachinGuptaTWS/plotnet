import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../../shared/shared.module';
import { ManagePlotsComponent } from './manage-plots.component';

@NgModule({
  declarations: [ManagePlotsComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild([{ path: '', component: ManagePlotsComponent }]),
    SharedModule,
  ]
})
export class ManagePlotsModule {}
