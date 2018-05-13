import { Component, OnInit, Input } from '@angular/core';
import { User } from '../Beans/User';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menubar',
  templateUrl: './menubar.component.html',
  styleUrls: ['./menubar.component.css']
})
export class MenubarComponent implements OnInit {

  allMenuItems: MenuItem[] = [{name:'Home',link:'home'},
  {name:'School',link:"school"}];
    @Input() user:User;
    constructor(private authService:AuthService,private router: Router) {
   }

  ngOnInit() { 
    this.allMenuItems.splice(1,0,{name:this.user.firstName, link: 'profile/' + this.user.userName});
  }

  logOut() {
    this.authService.logOut();
    this.router.navigate(['/']);
  }
}


class MenuItem {
  name: string;
  link: string;
}