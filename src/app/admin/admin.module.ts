import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {AdminLayoutComponent} from './shared/components/admin-layout/admin-layout.component';
import {LoginPageComponent} from './login-page/login-page.component';
import {DashbordPageComponent} from './dashbord-page/dashbord-page.component';
import {CreatePageComponent} from './create-page/create-page.component';
import {EditPageComponent} from './edit-page/edit-page.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {SharedModule} from '../shared/shared.module';
import {AuthGuard} from './shared/services/auth.guard';
import {SerchPipe} from './shared/pipes/serch.pipe';
import {AlertComponent} from './shared/components/alert/alert.component';
import {AlertService} from './shared/services/alert.service';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '', component: AdminLayoutComponent, children: [
          {
            path: '', redirectTo: '/admin/login', pathMatch: 'full',
          },
          {
            path: 'login', component: LoginPageComponent,
          },
          {
            path: 'dashboard', component: DashbordPageComponent, canActivate: [AuthGuard],
          },
          {
            path: 'create', component: CreatePageComponent, canActivate: [AuthGuard],
          },
          {
            path: 'post/:id/edit', component: EditPageComponent, canActivate: [AuthGuard],
          },
        ],
      },
    ]),
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
  ],
  exports: [RouterModule],
  declarations: [
    AdminLayoutComponent,
    LoginPageComponent,
    DashbordPageComponent,
    CreatePageComponent,
    EditPageComponent,
    SerchPipe,
    AlertComponent,
  ],
  providers: [AuthGuard, AlertService],
})


export class AdminModule {
}
