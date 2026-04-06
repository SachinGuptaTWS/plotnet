import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { ReviewsPublicComponent } from './reviews-public.component';

@NgModule({
  declarations: [ReviewsPublicComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([{ path: '', component: ReviewsPublicComponent }]),
    SharedModule,
  ],
})
export class ReviewsPublicModule {}
