import { Component, OnInit } from '@angular/core';
import { NgForm} from '@angular/forms';
import { AuthService } from '../auth.service';
import { Response } from '@angular/http';
import { error } from 'selenium-webdriver';
import { Router } from '@angular/router';
import { DialogBoxDetail } from '../../ui-component/popup-message/DialogBoxDetail';
import { Title } from '@angular/platform-browser'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  dialogBoxDetail:DialogBoxDetail = new DialogBoxDetail;

  constructor(private authService: AuthService, private router: Router, private titleService:Title) {
    if(this.authService.getLoginStatus()) {
      router.navigate(['/home']);
    }
   }
  ngOnInit() {
    this.titleService.setTitle("Login");
  }

  onSignIn(form: NgForm) {
    const username:string = form.value.username;
    const password:string = form.value.password;
    this.authService.signInUser(username,password).subscribe((response:Response) => {
      this.authService.login(response.text() + "");
      this.authService.setJwtToken(response.text());
      this.router.navigate(['\home']);
    },(error)=>{
      this.dialogBoxDetail.openDialogBox("Unable to Sign In", error);
    });

  }
}
