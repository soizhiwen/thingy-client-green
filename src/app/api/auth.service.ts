import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';


@Injectable()
export class AuthService {

  constructor(public jwtHelper: JwtHelperService,private http: HttpClient) {}

  public isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
  // Check whether the token is expired and return true or false
    return !this.jwtHelper.isTokenExpired(token);
  }

  login(email:string,password:string): Observable<string>{
    const token=  this.http.post<string>(
      'http://localhost:8080/login',
      {email,password}
  );
  return token;
  }

  signUp(email:string,password:string,name:string): Observable<string>{
    const token=  this.http.post<string>(
      'http://localhost:8080/register',
      {email,password,name,role:'Admin'}
  );
  return token;
  }



}
