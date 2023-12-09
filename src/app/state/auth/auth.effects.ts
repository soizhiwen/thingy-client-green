import { Injectable } from "@angular/core";
import { Actions, ROOT_EFFECTS_INIT, createEffect, ofType } from "@ngrx/effects";
import { catchError, map, mergeMap, tap } from "rxjs/operators";
import { ApiActions, AuthActions, UserActions } from "../actions";
import { Router } from "@angular/router";
import { of } from "rxjs";
import { AuthService } from "src/app/api/auth.service";
import { HttpResponse } from "@angular/common/http";
import { authGuard } from "src/app/auth/auth-guard.service";


@Injectable()
export class AuthEffects {

  constructor(
    private readonly actions$: Actions,
    private readonly authService: AuthService,
    private readonly router: Router,
  ) { }

  // on login, send auth data to backend,
  // get the token and put into the store and local storage
  login$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthActions.login),
      mergeMap(({ email, password }) => {
        return this.authService.login(email, password).pipe(
          tap((response) => {
            localStorage.setItem("token", response.headers.get("Authorization") ?? '');
            localStorage.setItem("userId", JSON.stringify(response.body?.id));
            this.router.navigateByUrl("/home/dashboard");
          }),
          map(() => AuthActions.loggedIn()),
          catchError((x) => of(AuthActions.loginError({ message: x.body, status: x.status })))
        );
      })
    );
  });

  signUp$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthActions.signUp),
      mergeMap(({ email, password, name }) => {
        return this.authService.signUp(email, password, name).pipe(
          tap((response) => {
            localStorage.setItem("token", response.headers.get("Authorization") ?? '');
            localStorage.setItem("userId", JSON.stringify(response.body?.id));
            this.router.navigateByUrl("/home/dashboard");
          }),
          map(() => AuthActions.loggedIn()),
          catchError((x) => of(AuthActions.loginError({ message: "SignUp failed", status: x.status })))
        );
      })
    );
  });

  logout$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(AuthActions.logOut),
        tap(() => {
          localStorage.removeItem("token");
          localStorage.removeItem("userId");
          this.router.navigateByUrl("");
        }),
        map(() => AuthActions.setUser({ userId: undefined }))
      );
    },
  );

  loginError$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(AuthActions.loginError),
        tap(() => {
          localStorage.removeItem("token");
        })
      );
    },
    { dispatch: false }
  );

  init$ = createEffect(() => this.actions$.pipe(
    ofType(AuthActions.loggedIn, ROOT_EFFECTS_INIT),
    map(() => AuthActions.setUser({ userId: this.authService.getCurrentUserId() }))
  ));
}
