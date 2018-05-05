import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Response } from '@angular/http';
import { Router } from '@angular/router';
import { User } from '../Beans/User';
import { UserService } from '../user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public currUser:User = null;
  constructor(private authService: AuthService, private router:Router, private userService:UserService) {
    if(this.authService.getLoginStatus() == false) {
      this.router.navigate(['/']);
    }
   }
    
  ngOnInit() { 
    this.getCurrUser();
  }


  getCurrUser() {
    if(this.currUser == null) {
      this.userService.getCurrUser().subscribe(
        data=>{
          this.currUser = data.user;
        },
        (error)=>{
        });
    }
  }

}