import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../../shared/shared.module';
import { ManageUsersComponent } from './manage-users.component';

@NgModule({
  declarations: [ManageUsersComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([{ path: '', component: ManageUsersComponent }]),
    SharedModule,
  ]
})
export class ManageUsersModule {}
