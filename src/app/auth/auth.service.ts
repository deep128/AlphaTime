import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Response } from '@angular/http';
import { tokenName } from '@angular/compiler';
import { Router } from '@angular/router';
import { Config } from '../services/config.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class AuthService {

  private jwtToken:string;
  readonly tokenName:string = "Token";
  private loggedIn:boolean = false;

  constructor(private http: HttpClient,private router:Router,private config:Config) { 
    let match = document.cookie.match(new RegExp(this.tokenName + '=[^;]+'));
    if(match) {
      this.setJwtToken(match[0].split("=")[1]);
      this.loggedIn = true;
    }
    else {
      this.loggedIn = false;
    }
   }

  signInUser(username: string, password: string):Observable<any> {
    const authUrl = this.config.baseAPIUrl + 'api/login';
    const header = new HttpHeaders({
      'Content-type' : 'application/json'
    });
    return this.http.post(authUrl, {
      username,
      password
    }, {headers: header});
  }

  setJwtToken(token:string) {
    this.jwtToken = token;
  }

  getToken():string {
    return this.jwtToken;
  }

  logOut() {
    document.cookie = this.tokenName + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    this.setJwtToken(null);
    this.loggedIn = false;
  }

  login(token:string) {
    document.cookie = this.tokenName + "=" + token + ";";
    this.setJwtToken(token);
    this.loggedIn = true;
  }

  getLoginStatus():boolean {
    return this.loggedIn;
  }

}
