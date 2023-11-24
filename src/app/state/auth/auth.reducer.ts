import { createReducer, on } from "@ngrx/store";
import { Auth } from "./auth.model";
import { AuthActions } from "../actions";



const initialState: Auth = {
  token: "",
  user: {
    name: 'User',
    role: 'User',
    email: 'email@email.com'
  },
};

export const authReducer = createReducer(
  initialState,
  on(AuthActions.setToken, (state, { token }): Auth => ({ ...state, token })),
  on(AuthActions.removeToken, (state): Auth => ({ ...state, token: "" })),
  on(AuthActions.setUser, (state, { user }): Auth => ({ ...state, user }))
);
