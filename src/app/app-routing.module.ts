import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router'
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './auth/login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { SignUpComponent } from './auth/sign-up/sign-up.component';
import { SchoolComponent } from './school/school.component';



const routes: Routes = [
  {path: 'home' , component: HomeComponent},
  {path: 'login' , component: LoginComponent},
  {path: 'signup/:link' , component: SignUpComponent},
  {path: 'profile/:username' , component: ProfileComponent},
  {path: 'school/:schoolid' , component: SchoolComponent},
  {path: 'school' , component: SchoolComponent},
  {path: '', redirectTo:'/login', pathMatch: 'full'}
]

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports:[RouterModule],
  declarations: []
})
export class AppRoutingModule { }
