import { NotificationActions } from './../actions';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';
import { ApiActions } from 'src/app/state/actions';
import { initialState } from './notification.reducer';
import { NotificationService } from 'src/app/api/notification.service';

@Injectable()
export class NotificationEffects {

    constructor(
        private actions$: Actions,
        private notificationService: NotificationService
    ) { }

    loadNotifications$ = createEffect(() => this.actions$.pipe(
        ofType(NotificationActions.loadNotifications),
        mergeMap(() => this.notificationService.getNotifications()
            .pipe(
                map(notífications => NotificationActions.receivedNotifications({ notifications: notífications })),
                catchError(() => of(NotificationActions.receivedNotifications({ notifications: initialState })))
            ))
    ));

    loadNotificationsByPlant$ = createEffect(() => this.actions$.pipe(
      ofType(NotificationActions.loadNotificationsByPlant),
      mergeMap(({ userId, plantId }) => this.notificationService.getNotificationsByPlant(userId,plantId)
          .pipe(
              map(notífications => NotificationActions.receivedPlantNotifications({ notifications: notífications })),
              catchError(() => of(NotificationActions.receivedPlantNotifications({ notifications: initialState })))
          ))
  ));


    updateNotification$ = createEffect(() => this.actions$.pipe(
        ofType(NotificationActions.updateNotification),
        mergeMap(({ notification: updatedNotification }) => this.notificationService.updateNotification(updatedNotification)
            .pipe(
                map(notification => NotificationActions.updatedNotification({ notification: notification })),
                catchError(() => of(ApiActions.errorOccured()))
            )
        )
    ));
}
