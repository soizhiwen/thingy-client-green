import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Greenhouse } from '../state/greenhouse/greenhouse.model';

@Injectable({ providedIn: 'root' })
export class GreenhouseService {
    constructor(private http: HttpClient) { }

    getGreenhouseData(): Observable<Greenhouse> {
        return this.http.get('http://localhost:8080/greenhouse/').pipe(
            map(result => this.toGreenhouse(result))
        );
    }

    private toGreenhouse(value: any): Greenhouse {
        return {
            timestamp: value.timestamp,
            temperature: value.TEMP,
            co2: value.CO2_EQUIV,
            humidity: value.HUMID,
            airQuality: value.AIR_QUAL
        }
    }
}