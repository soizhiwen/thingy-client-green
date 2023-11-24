import { createFeatureSelector, createSelector } from "@ngrx/store";
import { Auth } from "./auth.model";
// import { decode } from "some-jwt-library";

export const authFeature = createFeatureSelector<Auth>("auth");

export const selectToken = createSelector(
  authFeature,
  (state) => state.token,
);
export const selectIsAuth = createSelector(
  authFeature,
  (state) => !!state.token
);
export const selectUserData = createSelector(
  authFeature,
  (state) => state.user
);
