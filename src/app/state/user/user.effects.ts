import { Injectable } from '@angular/core';
import { Actions, ROOT_EFFECTS_INIT, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';
import { ApiActions, AuthActions, UserActions } from 'src/app/state/actions';
import { UserService } from 'src/app/api/user.service';
import { initialState } from './user.reducer';

@Injectable()
export class UserEffects {

    constructor(
        private actions$: Actions,
        private userService: UserService
    ) { }

    loadUsers$ = createEffect(() => this.actions$.pipe(
        ofType(UserActions.loadUsers, AuthActions.loggedIn, ROOT_EFFECTS_INIT),
        mergeMap(() => this.userService.getUsers()
            .pipe(
                map(users => ApiActions.receivedUsers({ users: users })),
                catchError(() => of(ApiActions.errorOccured()))
            ))
    ));

    addUser$ = createEffect(() => this.actions$.pipe(
        ofType(UserActions.addUser),
        mergeMap(({ user: newUser }) => this.userService.addUser(newUser)
            .pipe(
                map(user => ApiActions.addedUser({ user: user })),
                catchError(() => of(ApiActions.errorOccured()))
            )
        )
    ));

    updateUser$ = createEffect(() => this.actions$.pipe(
        ofType(UserActions.updateUser),
        mergeMap(({ user: updatedUser }) => this.userService.updateUser(updatedUser)
            .pipe(
                map(user => ApiActions.updatedUser({ user: user })),
                catchError(() => of(ApiActions.errorOccured()))
            )
        )
    ));

    deleteUser$ = createEffect(() => this.actions$.pipe(
        ofType(UserActions.deleteUser),
        mergeMap(({ userId: id }) => this.userService.deleteUser(id)
            .pipe(
                map(id => ApiActions.deletedUser({ userId: id })),
                catchError(() => of(ApiActions.errorOccured()))
            )
        )
    ));
}