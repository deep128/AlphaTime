import { Component, OnInit } from '@angular/core';
import { Config } from '../config.service'
import { HttpRequest, HttpClient } from '@angular/common/http';
import {Title} from '@angular/platform-browser';
import { User } from '../Beans/User';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  baseURL:string;
  username:string;
  profileUser:User;

  constructor(private config:Config, private httpClient:HttpClient, private titleService:Title, private route:ActivatedRoute ) {
    this.baseURL = config.baseAPIUrl;
   }

  ngOnInit() {
    this.route.params.subscribe(params=>{
      this.username = params["username"];
      this.titleService.setTitle(this.username);
    });
  }

  fileEvent(event) {
    let fileList:FileList = event.target.files;
    let file:File;
    if(fileList.length > 0) {
      let file = fileList[0];
    }
    else {
      alert("no file seleted");
      return;
    }

    let formData:FormData = new FormData();
    formData.append("UploadFile",file, file.name);

    const req = new HttpRequest('POST', this.baseURL + "uploadFile", formData,{reportProgress: true});
    this.httpClient.request(req).subscribe(event=>{
      console.log(event);
    }, err => {
      console.log("Error: ", err)
    });
  }

  getProfileUser() {
    
  }

}
