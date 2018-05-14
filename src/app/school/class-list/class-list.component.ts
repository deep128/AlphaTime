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
  public classList:Class[];
  constructor(private classService:ClassService) { }

  ngOnInit() {


  }

}
