import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Plant } from '../state/plant/plant.model';

@Injectable({ providedIn: 'root' })
export class PlantService {
    constructor(private http: HttpClient) { }

    getPlants(): Observable<Plant[]> {
        return this.http.get<Plant[]>('http://localhost:8080/plants/');
    }

    addPlant(newPlant: Plant) {
        return this.http.post<Plant>(
            'http://localhost:8080/plants/',
            newPlant
        );
    }

    updatePlant(plant: Plant) {
        return this.http.patch<Plant>(
            'http://localhost:8080/plants/' + plant.id,
            plant
        );
    }

    deletePlant(plantId: number) {
        return this.http.delete<number>(
            'http://localhost:8080/plants/' + plantId
        );
    }
}