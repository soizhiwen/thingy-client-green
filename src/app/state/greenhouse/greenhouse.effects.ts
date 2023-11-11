import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { ApiActions, DashboardActions } from 'src/app/state/actions';
import { ApiService } from 'src/app/api/api.service';
import { initialState } from './greenhouse.reducer';
import { of } from 'rxjs';

@Injectable()
export class GreenhouseEffects {

    constructor(
        private actions$: Actions,
        private apiService: ApiService
    ) { }

    loadGreenhouseData$ = createEffect(() => this.actions$.pipe(
        ofType(DashboardActions.loadGreenhouseData),
        mergeMap(() => this.apiService.getGreenhouseData()
            .pipe(
                map(greenhouseData => ApiActions.receivedGreenhouseData({ greenhouse: greenhouseData })),
                catchError(() => of(ApiActions.receivedGreenhouseData({ greenhouse: initialState })))
            ))
    )
    );
}