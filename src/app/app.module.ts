import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { MenubarComponent } from './menubar/menubar.component';
import { HamburgerComponent } from './ui-component/hamburger/hamburger.component';
import { UserService } from './services/user.service';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './/app-routing.module';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './auth/login/login.component';
import { FormsModule } from '@angular/forms';
import { AuthService } from './auth/auth.service';
import { HttpModule } from '@angular/http';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './Shared/auth.interceptor';
import { HeaderComponent } from './auth/ui-components/header/header.component';
import { PopupMessageComponent } from './ui-component/popup-message/popup-message.component';
import { Config } from './services/config.service';
import { ProfileComponent } from './profile/profile.component';
import { SignUpComponent } from './auth/sign-up/sign-up.component';
import { SchoolComponent } from './school/school.component';
import { SchoolService } from './services/school.service';
import { NotfoundComponent } from './extra/notfound/notfound.component';
import { ClassListComponent } from './school/class-list/class-list.component';



@NgModule({
  declarations: [
    AppComponent,
    MenubarComponent,
    HamburgerComponent,
    HomeComponent,
    LoginComponent,
    HeaderComponent,
    PopupMessageComponent,
    ProfileComponent,
    SignUpComponent,
    SchoolComponent,
    NotfoundComponent,
    ClassListComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [
    UserService,
    HttpClientModule,
    AuthService,
    SchoolService,
    Config,
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
