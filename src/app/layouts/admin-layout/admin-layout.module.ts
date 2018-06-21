import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminLayoutRoutes } from './admin-layout.routing';
import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { UserProfileComponent } from '../../pages/user-profile/user-profile.component';
import { UserListComponent } from '../../pages/user-list/user-list.component';
import { ContractsComponent } from '../../pages/contracts/contracts.component';
import { AngularFontAwesomeModule } from 'angular-font-awesome';

import {
  MatButtonModule,
  MatInputModule,
  MatRippleModule,
  MatTooltipModule,
} from '@angular/material';
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    MatButtonModule,
    MatRippleModule,
    MatInputModule,
    MatTooltipModule,
    AngularFontAwesomeModule
  ],
  declarations: [
    DashboardComponent,
    UserProfileComponent,
    UserListComponent,
    ContractsComponent
  ]
})

export class AdminLayoutModule {}
