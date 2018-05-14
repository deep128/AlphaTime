import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from '../Beans/User';
import { UserService } from '../services/user.service';
import { SchoolService } from '../services/school.service';
import { School } from '../Beans/School';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-school',
  templateUrl: './school.component.html',
  styleUrls: ['./school.component.css']
})
export class SchoolComponent implements OnInit {

  public currUser:User;
  public school:School = null;
  public show:boolean;

  public leftPanelObjects = [
    {name: "Classes",component: "app-class-list"},
    {name: "Teachers",component: "teacher"},
    {name: "Students",component: "students"}
];

  public selectedComponent:string;

  constructor(private route:ActivatedRoute, private userService:UserService, private schoolService:SchoolService,
  private titleService:Title) {
    this.selectedComponent = this.leftPanelObjects[0].component;
   }

  ngOnInit() {
    this.getCurrUser();
    this.route.params.subscribe((params)=>{
      if(typeof params.schoolid === "undefined") {
          this.getSchool(0);
      }
      else {
        if(params.schoolid.match(/^\d+/)) {
          this.getSchool(parseInt(params.schoolid));
        }
        else {
          this.show = true;
        }
      }
    });
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

  getSchool(schoolid:number) {
    this.schoolService.getSchool(schoolid).subscribe(data=>{
      if(data.success) {
        this.school = new School();
        this.school.name = data.school.name;
        this.school.id = parseInt(data.school.id);
        this.titleService.setTitle(this.school.name);
      }
      else {

      }
      this.show = true;
    });
  }

  onSelectComponent(component:string) {
    this.selectedComponent = component;
  }

}
