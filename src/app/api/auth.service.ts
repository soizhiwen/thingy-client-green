import { HttpClient, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable, of } from 'rxjs';
import { User } from '../state/user/user.model';
import { Store } from '@ngrx/store';


@Injectable()
export class AuthService {

  constructor(public jwtHelper: JwtHelperService, private http: HttpClient, private store: Store) { }

  public isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    // Check whether the token is expired and return true or false
    return !this.jwtHelper.isTokenExpired(token);
  }

  public getCurrentUserId(): number | undefined {
    const userIdString: string | undefined = localStorage.getItem('userId') ?? undefined;
    if (userIdString == undefined)
      return undefined;
    return +userIdString;
  }

  login(email: string, password: string): Observable<HttpResponse<User>> {
    const response = this.http.post<User>(
      'http://localhost:8080/login',
      { email, password },
      { observe: 'response' }
    );
    return response;
  }

  signUp(email: string, password: string, name: string): Observable<HttpResponse<User>> {
    const response = this.http.post<User>(
      'http://localhost:8080/register',
      { email, password, name, role: 'Admin' },
      { observe: 'response' }
    );
    return response;
  }
}
