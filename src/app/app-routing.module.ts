import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./login/login.component";
import {RegisterComponent} from "./register/register.component";
import {UserComponent} from "./user/user.component";
import {FormComponent} from "./form/form.component";
import {ActiveComponent} from "./active/active.component";
import {InactiveComponent} from "./inactive/inactive.component";
import {DetailComponent} from "./detail/detail.component";
import {ReadyComponent} from "./ready/ready.component";

const itemRoutes: Routes = [
  { path: 'form', component: FormComponent},
  { path: 'active', component: ActiveComponent},
  { path: 'inactive', component: InactiveComponent},
  { path: 'ready', component: ReadyComponent},
  { path: 'inactive/:idApp', component: DetailComponent},
  { path: 'ready/:idApp', component: DetailComponent},
  { path: 'active/:idApp', component: DetailComponent},
];


const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'user', component: UserComponent},
  {path: 'user', component: UserComponent, children: itemRoutes},
  {path: '', redirectTo: '/login', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
