import { Injectable } from "@angular/core";
import { Actions, ROOT_EFFECTS_INIT, createEffect, ofType } from "@ngrx/effects";
import { catchError, map, mergeMap, tap } from "rxjs/operators";
import { AuthActions } from "../actions";
import { Router } from "@angular/router";
import { of } from "rxjs";
import { AuthService } from "src/app/api/auth.service";
import { HttpResponse } from "@angular/common/http";


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
          map((response: HttpResponse<string>) => {
            return response.headers.get("Authorization") ?? ''
          }),
          tap((token: string) => {
            localStorage.setItem("token", token);
            this.router.navigateByUrl("/home/dashboard");
          }),
          map((token) => AuthActions.setToken({ token })),
          catchError(() => of(AuthActions.loginError({ message: "Login failed" })))
        );
      })
    );
  });

  signUp$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthActions.signUp),
      mergeMap(({ email, password, name }) => {
        return this.authService.signUp(email, password, name).pipe(
          map((response: HttpResponse<string>) => {
            return response.headers.get("authorization") ?? '';
          }),
          tap((token) => {
            localStorage.setItem("token", token);
            this.router.navigateByUrl("/home/dashboard");
          }),
          map((token) => AuthActions.setToken({ token })),
          catchError(() => of(AuthActions.loginError({ message: "SignUp failed" })))
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
          this.router.navigateByUrl("");
        })
      );
    },
    { dispatch: false }
  );

  //get token from the local storage and set
  // init$ = createEffect(() => {
  //   return this.actions$.pipe(
  //     ofType(ROOT_EFFECTS_INIT),
  //     mergeMap(({ email, password }) => {
  //       return this.authService.getCurrentUser().pipe(
  //         map(({ token }) => AuthActions.setUser({ user })),
  //         catchError(() => of(AuthActions.setUserError({ message: "Error" })))
  //       );
  //     })
  //   );
  // });


}
