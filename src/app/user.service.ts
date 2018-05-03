import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { User } from './Beans/User';
import { HttpClient, HttpHandler, HttpParams } from '@angular/common/http';
import { Config } from './config.service';

@Injectable()
export class UserService {

  constructor(private http: HttpClient, private config: Config) { }

  getUsers(condition): Observable<any> {
    
    let options = {
      params: new HttpParams()
    }

    condition.forEach(element => {
      options.params.set(element.column, element.value);
    });
    return this.http.get(this.config.baseAPIUrl + "users", options);
  }

  getCurrUser(): Observable<any> {
    return this.http.get<User>(this.config.baseAPIUrl + "user");
  }

}