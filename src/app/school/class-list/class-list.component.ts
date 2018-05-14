import { Component, OnInit, Input } from '@angular/core';
import { ClassService } from '../../services/class.service';
import { Class } from '../../Beans/Class';

@Component({
  selector: 'app-class-list',
  templateUrl: './class-list.component.html',
  styleUrls: ['./class-list.component.css']
})
export class ClassListComponent implements OnInit {

  @Input() schoolid:number;
  public classList:Class[] = [];
  constructor(private classService:ClassService) { }

  ngOnInit() {
    this.getClassList();

  }

  getClassList() {
    this.classService.getClassesBySchool(this.schoolid).subscribe(data=>{
      if(data.sussess = true) {
        data.classes.forEach(element => {
          this.classList.push(this.parseClass(element));
        });
      }
    }, err =>{
      console.log(err);
    });
  }

  parseClass(data){
    var vclass = new Class;
    vclass.id = data.id;
    vclass.level = data.level;
    vclass.name = data.name;
    vclass.schoolid = this.schoolid;
    if(data.classteacherusername != null) {
      vclass.classTeacher = {
        name: data.classteachername,
        username: data.classteacherusername
      }
    }
    return vclass;
  }

}
