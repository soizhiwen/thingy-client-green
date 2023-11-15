import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';
import { ApiActions, DashboardActions, PlantActions } from 'src/app/state/actions';
import { ApiService } from 'src/app/api/api.service';
import { initialState } from './plant.reducer';

@Injectable()
export class PlantEffects {

    constructor(
        private actions$: Actions,
        private apiService: ApiService
    ) { }

    loadPlants$ = createEffect(() => this.actions$.pipe(
        ofType(PlantActions.loadPlants),
        mergeMap(() => this.apiService.getPlants()
            .pipe(
                map(plants => ApiActions.receivedPlants({ plants: plants })),
                catchError(() => of(ApiActions.receivedPlants({ plants: initialState })))
            ))
    ));

    addPlant$ = createEffect(() => this.actions$.pipe(
        ofType(PlantActions.addPlant),
        tap(({ plant: newPlant }) => this.apiService.addPlant(newPlant))
    ), { dispatch: false });

    updatePlant$ = createEffect(() => this.actions$.pipe(
        ofType(PlantActions.updatePlant),
        tap(({ plant: plant }) => this.apiService.updatePlant(plant))
    ), { dispatch: false });

    deletePlant$ = createEffect(() => this.actions$.pipe(
        ofType(PlantActions.deletePlant),
        tap(({ plantId: id }) => this.apiService.deletePlant(id))
    ), { dispatch: false });
}