import { Injectable } from '@angular/core';
import { Config } from './config.service';
import { HttpParams, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ClassService {

  constructor(private config:Config, private httpClient:HttpClient) { }

  getClassesBySchool(schoolid):Observable<any> {
    const options = {
      params: new HttpParams().set("schoolid",schoolid)
    }

    return this.httpClient.get(this.config.baseAPIUrl + "classesbyschool", options);
  }
}
