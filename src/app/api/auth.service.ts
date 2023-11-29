import { HttpClient, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';


@Injectable()
export class AuthService {

  constructor(public jwtHelper: JwtHelperService, private http: HttpClient) { }

  public isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    // Check whether the token is expired and return true or false
    return !this.jwtHelper.isTokenExpired(token);
  }

  login(email: string, password: string): Observable<HttpResponse<string>> {
    const response = this.http.post<string>(
      'http://localhost:8080/login',
      { email, password },
      { observe: 'response' }
    );
    return response;
  }

  signUp(email: string, password: string, name: string): Observable<HttpResponse<string>> {
    const response = this.http.post<string>(
      'http://localhost:8080/register',
      { email, password, name, role: 'Admin' },
      { observe: 'response' }
    );
    return response;
  }



}
