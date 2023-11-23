import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';
import { ApiActions, PlantActions } from 'src/app/state/actions';
import { PlantService } from 'src/app/api/plant.service';
import { initialState } from './plant.reducer';

@Injectable()
export class PlantEffects {

    constructor(
        private actions$: Actions,
        private plantService: PlantService
    ) { }

    loadPlants$ = createEffect(() => this.actions$.pipe(
        ofType(PlantActions.loadPlants),
        mergeMap(() => this.plantService.getPlants()
            .pipe(
                map(plants => ApiActions.receivedPlants({ plants: plants })),
                catchError(() => of(ApiActions.receivedPlants({ plants: initialState })))
            ))
    ));

    addPlant$ = createEffect(() => this.actions$.pipe(
        ofType(PlantActions.addPlant),
        mergeMap(({ plant: newPlant }) => this.plantService.addPlant(newPlant)
            .pipe(
                map(plant => ApiActions.addedPlant({ plant: plant })),
                catchError(() => of(ApiActions.errorOccured()))
            )
        )
    ));

    updatePlant$ = createEffect(() => this.actions$.pipe(
        ofType(PlantActions.updatePlant),
        mergeMap(({ plant: updatedPlant }) => this.plantService.updatePlant(updatedPlant)
            .pipe(
                map(plant => ApiActions.updatedPlant({ plant: plant })),
                catchError(() => of(ApiActions.errorOccured()))
            )
        )
    ));

    deletePlant$ = createEffect(() => this.actions$.pipe(
        ofType(PlantActions.deletePlant),
        mergeMap(({ plantId: id }) => this.plantService.deletePlant(id)
            .pipe(
                map(id => ApiActions.deletedPlant({ plantId: id })),
                catchError(() => of(ApiActions.errorOccured()))
            )
        )
    ));
}