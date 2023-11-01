import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Greenhouse } from './greenhouse.model';

@Injectable({ providedIn: 'root' })
export class ThingyApiService {
    constructor(private http: HttpClient) { }

    getGreenhouseData(): Observable<Greenhouse> {
        return this.http.get<Greenhouse>('http://localhost:8080/greenhouse/');
    }
}