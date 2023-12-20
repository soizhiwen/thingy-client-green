import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Plant } from '../state/plant/plant.model';

@Injectable({ providedIn: 'root' })
export class PlantService {
    constructor(private http: HttpClient) { }

    getPlants(): Observable<Plant[]> {
        return this.http.get<Plant[]>('https://soizhiwen.com/api/plants/');
    }

    addPlant(newPlant: Plant) {
        return this.http.post<Plant>(
            'https://soizhiwen.com/api/plants/',
            newPlant
        );
    }

    updatePlant(plant: Plant) {
        return this.http.patch<Plant>(
            'https://soizhiwen.com/api/plants/' + plant.id,
            plant
        );
    }

    deletePlant(plantId: number) {
        return this.http.delete<number>(
            'https://soizhiwen.com/api/plants/' + plantId
        );
    }
}