import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { DialogBoxDetail } from '../../ui-component/popup-message/DialogBoxDetail';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  dialogBoxDetail:DialogBoxDetail = new DialogBoxDetail;

  @ViewChild("f") signupForm: NgForm;

  constructor(private authService: AuthService, private router: Router, private titleService:Title, private route:ActivatedRoute) {
    if(this.authService.getLoginStatus()) {
      router.navigate(['/home']);
    }
   }

  ngOnInit() {
    this.titleService.setTitle("SignUp");
    this.route.params.subscribe((params)=>{
      
    });
  }

  onSignUp() {
  }

}
