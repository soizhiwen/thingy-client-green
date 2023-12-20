import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Greenhouse } from '../state/greenhouse/greenhouse.model';
import { AppId } from './AppId';
import { Graph } from '../state/graph/graph.model';

@Injectable({ providedIn: 'root' })
export class GreenhouseService {
    constructor(private http: HttpClient) { }

    getGreenhouseData(): Observable<Greenhouse> {
        return this.http.get('https://soizhiwen.com/greenhouse/').pipe(
            map(result => this.toGreenhouse(result))
        );
    }

    getGreenhouseGraphData(appId: AppId): Observable<Graph[]> {
        return this.http.get<Graph[]>(`https://soizhiwen.com/greenhouse/${appId}/0`);
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