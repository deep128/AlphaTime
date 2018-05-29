import { Component, OnInit, Input } from '@angular/core';
import { ClassService } from '../../services/class.service';
import { Class } from '../../Beans/Class';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-class-list',
  templateUrl: './class-list.component.html',
  styleUrls: ['./class-list.component.css']
})
export class ClassListComponent implements OnInit {

  @Input() schoolid:number;
  public classList:Class[] = [];
  constructor(private classService:ClassService) { }
  public showAddClass:boolean;

  ngOnInit() {
    this.getClassList();
  }

  getClassList() {
    this.classService.getClassesBySchool(this.schoolid).subscribe(data=>{
      if(data.sussess = true) {
        this.classList = [];
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

  public range(n:number) {
    return n>0?this.range(n - 1).concat(n):[];
  }

  onSubmitClass(classForm:NgForm) {
    let vclass:Class = new Class;
    vclass.id = parseInt(classForm.value.id);
    vclass.level = parseInt(classForm.value.level);
    vclass.name = classForm.value.name;
    vclass.schoolid = this.schoolid;
    this.classService.saveClass(vclass).subscribe(data=>{
      if(data.success) {
        this.showAddClass = false;
        this.getClassList();
      }
    },err=>{
      console.log(err);
    });
  }

}
