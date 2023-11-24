import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../state/user/user.model';

@Injectable({ providedIn: 'root' })
export class UserService {
    constructor(private http: HttpClient) { }

    getUsers(): Observable<User[]> {
        return this.http.get<User[]>('http://localhost:8080/users/');
    }

    addUser(newUser: User) {
        return this.http.post<User>(
            'http://localhost:8080/users/',
            newUser
        );
    }

    updateUser(user: User) {
        return this.http.patch<User>(
            'http://localhost:8080/users/' + user.id,
            user
        );
    }

    deleteUser(userId: number) {
        return this.http.delete<number>(
            'http://localhost:8080/users/' + userId
        );
    }
}