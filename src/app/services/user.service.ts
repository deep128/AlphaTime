import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { User } from '../Beans/User';
import { HttpClient, HttpHandler, HttpParams } from '@angular/common/http';
import { Config } from '../services/config.service';

@Injectable()
export class UserService {

  constructor(private http: HttpClient, private config: Config) { }

  getUsersByUserName(usernameList): Observable<any> {
    
    let options = {
      params: new HttpParams().set("usernameList", JSON.stringify(usernameList))
    }

    return this.http.get(this.config.baseAPIUrl + "usersByUsername", options);
  }

  getCurrUser(): Observable<any> {
    return this.http.get<User>(this.config.baseAPIUrl + "user");
  }

}