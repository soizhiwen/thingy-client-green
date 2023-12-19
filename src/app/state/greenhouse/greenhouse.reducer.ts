import { createReducer, on } from "@ngrx/store";
import { Greenhouse } from "./greenhouse.model";
import { ApiActions } from "../actions";

export const initialState: Greenhouse = { timestamp: 0, temperature: 0, humidity: 0, co2: 0, airQuality: 0 };

export const greenhouseReducer = createReducer(
    initialState,
    on(ApiActions.receivedCurrentGreenhouseData, (_, { greenhouse }) => greenhouse)
);