import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../../shared/shared.module';
import { PlotListComponent } from './plot-list.component';

@NgModule({
  declarations: [PlotListComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild([{ path: '', component: PlotListComponent }]),
    SharedModule,
  ]
})
export class PlotListModule {}
