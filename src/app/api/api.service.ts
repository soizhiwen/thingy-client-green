import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, of, tap } from 'rxjs';
import { Greenhouse } from '../state/greenhouse/greenhouse.model';
import { Plant } from '../state/plant/plant.model';

@Injectable({ providedIn: 'root' })
export class ApiService {
    constructor(private http: HttpClient) { }

    getGreenhouseData(): Observable<Greenhouse> {
        return this.http.get('http://localhost:8080/greenhouse/').pipe(
            map(result => this.toGreenhouse(result))
        );
    }

    getPlants(): Observable<Plant[]> {
        return this.http.get<Plant[]>('http://localhost:8080/plants/');
    }

    addPlant(newPlant: Plant) {
        return this.http.post(
            'http://localhost:8080/plants/',
            newPlant
        );
    }

    updatePlant(plant: Plant) {
        return this.http.patch(
            'http://localhost:8080/plants/' + plant.id,
            plant
        );
    }

    deletePlant(plantId: number) {
        return this.http.delete(
            'http://localhost:8080/plants/' + plantId
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