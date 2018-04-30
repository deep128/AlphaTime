import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm} from '@angular/forms';
import { AuthService } from '../auth.service';
import { Response } from '@angular/http';
import { error } from 'selenium-webdriver';
import { Router } from '@angular/router';
import { DialogBoxDetail } from '../../ui-component/popup-message/DialogBoxDetail';
import { Title } from '@angular/platform-browser'
import {  } from 'crypto-js';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  dialogBoxDetail:DialogBoxDetail = new DialogBoxDetail;
  @ViewChild("f") loginForm: NgForm;

  constructor(private authService: AuthService, private router: Router, private titleService:Title) {
    if(this.authService.getLoginStatus()) {
      router.navigate(['/home']);
    }
   }
  ngOnInit() {
    this.titleService.setTitle("Login");
  }

  onSignIn() {
    const username:string = this.loginForm.value.username;
    const password:string = this.loginForm.value.password;
    this.authService.signInUser(username,password).subscribe((response:Response) => {
      let resp = JSON.parse(response.text() + "");
      if(resp.success) {
        let token = resp.token;
        this.authService.login(token);
        this.authService.setJwtToken(token);
        this.router.navigate(['\home']);
      }
      else {
        this.dialogBoxDetail.openDialogBox("Login failed!", resp.msg);
      }
      
    },(error)=>{
      this.dialogBoxDetail.openDialogBox("Error", error);
    });

  }
}
