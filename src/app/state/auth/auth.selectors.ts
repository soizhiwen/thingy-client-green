import { createFeatureSelector, createSelector } from "@ngrx/store";
import { Auth } from "./auth.model";

export const authFeature = createFeatureSelector<Auth>("auth");

export const selectLoginError = createSelector(
  authFeature,
  (state) => state.loginError,
);
