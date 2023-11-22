import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';
import { ApiActions, UserActions } from 'src/app/state/actions';
import { UserService } from 'src/app/api/user.service';
import { initialState } from './user.reducer';

@Injectable()
export class UserEffects {

    constructor(
        private actions$: Actions,
        private userService: UserService
    ) { }

    loadUsers$ = createEffect(() => this.actions$.pipe(
        ofType(UserActions.loadUsers),
        mergeMap(() => this.userService.getUsers()
            .pipe(
                map(users => ApiActions.receivedUsers({ users: users })),
                catchError(() => of(ApiActions.receivedUsers({ users: initialState })))
            ))
    ));

    addUser$ = createEffect(() => this.actions$.pipe(
        ofType(UserActions.addUser),
        tap(({ user: newUser }) => this.userService.addUser(newUser))
    ), { dispatch: false });

    updateUser$ = createEffect(() => this.actions$.pipe(
        ofType(UserActions.updateUser),
        tap(({ user: user }) => this.userService.updateUser(user))
    ), { dispatch: false });

    deleteUser$ = createEffect(() => this.actions$.pipe(
        ofType(UserActions.deleteUser),
        tap(({ userId: id }) => this.userService.deleteUser(id))
    ), { dispatch: false });
}