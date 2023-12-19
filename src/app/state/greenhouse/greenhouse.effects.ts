import { Injectable } from '@angular/core';
import { Actions, ROOT_EFFECTS_INIT, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { ApiActions, AuthActions, DashboardActions } from 'src/app/state/actions';
import { GreenhouseService } from 'src/app/api/greenhouse.service';
import { initialState } from './greenhouse.reducer';
import { of } from 'rxjs';

@Injectable()
export class GreenhouseEffects {

    constructor(
        private actions$: Actions,
        private apiService: GreenhouseService
    ) { }

    loadGreenhouseData$ = createEffect(() => this.actions$.pipe(
        ofType(DashboardActions.loadCurrentGreenhouseData, AuthActions.loggedIn),
        mergeMap(() => this.apiService.getGreenhouseData()
            .pipe(
                map(greenhouseData => ApiActions.receivedCurrentGreenhouseData({ greenhouse: greenhouseData })),
                catchError(() => of(ApiActions.receivedCurrentGreenhouseData({ greenhouse: initialState })))
            ))
    )
    );
}