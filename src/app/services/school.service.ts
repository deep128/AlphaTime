import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Config } from '../services/config.service';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class SchoolService {

  constructor(private httpClient:HttpClient, private config:Config) { }

  getSchool(schoolid): Observable<any> {
    var options = {
      params: new HttpParams().set("schoolid",schoolid)
    }
    return this.httpClient.get(this.config.baseAPIUrl + "school", options);
  }

}
