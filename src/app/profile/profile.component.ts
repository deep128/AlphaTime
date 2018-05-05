import { Component, OnInit } from '@angular/core';
import { Config } from '../config.service'
import { HttpRequest, HttpClient } from '@angular/common/http';
import { Title } from '@angular/platform-browser';
import { User } from '../Beans/User';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  baseURL:string;
  username:string;
  public profileUser:User;
  public currUser:User;
  public itsMe:boolean;
  public show:boolean = false;

  constructor(private config:Config, private httpClient:HttpClient, private titleService:Title, private route:ActivatedRoute,
  private userService: UserService ) {
    this.baseURL = config.baseAPIUrl;
   }

  ngOnInit() {
    this.route.params.subscribe(params=>{
      this.username = params["username"];
      this.getProfileUser(this.username);
      this.getCurrUser();
    });
  }

  fileEvent(event) {
    let file = event.target.files[0];

    let formData:FormData = new FormData();
    formData.append("UploadFile",file, file.name);
    formData.append("fileType",file.type);

    const req = new HttpRequest('POST', this.baseURL + "uploadProfileImage", formData,{reportProgress: true});
    this.httpClient.request(req).subscribe(event=>{
      this.updateProfileUser(this.username);
    }, err => {
      console.log("Error: ", err)
    });
  }

  getProfileUser(username) {
    this.userService.getUsersByUserName([username]).subscribe(users=>{
      if(users.length > 0) {
        this.profileUser = users[0].user;
        this.titleService.setTitle(this.profileUser.firstName + " " + this.profileUser.lastName);

        if(this.currUser != null && this.profileUser.userName === this.currUser.userName)
          this.itsMe = true;
      }
      else {
        this.titleService.setTitle("Not Found");
      }
      this.show = true;
    });
  }

  updateProfileUser(username) {
    this.userService.getUsersByUserName([username]).subscribe(users=>{
      if(users.length > 0) {
        this.profileUser = users[0].user;
      }
    });
  }

  getCurrUser() {
    if(this.currUser == null) {
      this.userService.getCurrUser().subscribe(
        data=>{
          this.currUser = data.user;
          if(this.profileUser != null && this.profileUser.userName === this.currUser.userName)
            this.itsMe = true;
        },
        (error)=>{
        });
    }
  }

  changeProfileImageClick() {
    document.getElementById("userImageInput").click()
;  }

}
