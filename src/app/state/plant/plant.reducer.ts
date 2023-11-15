import { createReducer, on } from "@ngrx/store";
import { ApiActions } from "../actions";
import { Plant } from "./plant.model";

export const initialState: Plant[] = []

export const plantReducer = createReducer(
    initialState,
    on(ApiActions.receivedPlants, (_, { plants }) => plants)
);