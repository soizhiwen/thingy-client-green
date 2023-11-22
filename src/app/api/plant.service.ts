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
}