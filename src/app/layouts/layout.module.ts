import { NgModule } from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import { AppLayoutComponent } from './app-layout/app-layout.component';
import { AuthLayoutComponent } from './auth-layout/auth-layout.component';
import { ErrorLayoutComponent } from './error-layout/error-layout.component';
import { RouterModule } from "@angular/router";
import { HeaderComponent } from '../shared/components/header/header.component';
import { NavComponent } from '../shared/components/nav/nav.component';
import {CreateAccountBannerComponent} from "../shared/components/create-account-banner/create-account-banner.component";
import {QueryModalComponent} from "../shared/components/query-modal/query-modal";
import {ToastModule} from "primeng/toast";
import {provideToastr, ToastrService} from "ngx-toastr";
import {provideAnimations} from "@angular/platform-browser/animations";
import {DialogService} from "primeng/dynamicdialog";

@NgModule({
  declarations: [
    AppLayoutComponent,
    AuthLayoutComponent,
    ErrorLayoutComponent,
    HeaderComponent,
    NavComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    NgOptimizedImage,
    CreateAccountBannerComponent,
    QueryModalComponent,
    ToastModule,
  ],
  exports: [
    AppLayoutComponent,
    AuthLayoutComponent,
    ErrorLayoutComponent,
    HeaderComponent
  ],
  providers: [
    provideAnimations(),
    provideToastr(),
    {
      provide: DialogService,
      useClass: DialogService
    }
  ]
})
export class LayoutModule { }