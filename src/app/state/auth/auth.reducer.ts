import { createReducer, on } from "@ngrx/store";
import { Auth } from "./auth.model";
import { AuthActions } from "../actions";

const initialState: Auth = {
  loginError: '',
  userId: undefined
};

export const authReducer = createReducer(
  initialState,
  on(AuthActions.loginError, (state, { status }): Auth => (
    { ...state, loginError: status == 404 ? 'Wrong user name or password.' : 'User already exists.' }
  )),
  on(AuthActions.setUser, (state, { userId }): Auth => ({ ...state, userId }))
);
