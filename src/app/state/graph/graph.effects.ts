import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { ApiActions, DashboardActions } from 'src/app/state/actions';
import { GreenhouseService } from 'src/app/api/greenhouse.service';
import { of } from 'rxjs';

@Injectable()
export class GraphEffects {

    constructor(
        private actions$: Actions,
        private apiService: GreenhouseService
    ) { }

    loadGreenhouseData$ = createEffect(() => this.actions$.pipe(
        ofType(DashboardActions.loadGreenhouseGraphData),
        mergeMap(({ appId }) => this.apiService.getGreenhouseGraphData(appId)
            .pipe(
                map(graphData => ApiActions.receivedGraphData({ data: graphData })),
                catchError(() => of(ApiActions.errorOccured()))
            ))
    )
    );
}