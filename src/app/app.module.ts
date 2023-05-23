import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {AuthenticationService} from "./service/authentication.service";
import {AuthInterceptor} from "./interceptor/auth.interceptor";
import {NotificationModule} from "./notification.module";
import {UserService} from "./service/user.service";
import {NotificationService} from "./service/notification.service";
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { UserComponent } from './user/user.component';
import {FormsModule} from "@angular/forms";
import {AuthenticationGuard} from "./guard/authentication.guard";
import { FormComponent } from './form/form.component';
import { ActiveComponent } from './active/active.component';
import { InactiveComponent } from './inactive/inactive.component';
import { DetailComponent } from './detail/detail.component';
import { ReadyComponent } from './ready/ready.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    UserComponent,
    FormComponent,
    ActiveComponent,
    InactiveComponent,
    DetailComponent,
    ReadyComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NotificationModule,
    FormsModule
  ],
  providers: [NotificationService, AuthenticationGuard, AuthenticationService, UserService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
