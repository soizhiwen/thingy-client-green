import { createReducer, on } from "@ngrx/store";
import { Greenhouse } from "../thingyApi/greenhouse.model";
import { ThingyApiActions } from "./thingyApi.actions";

export const initialState: Greenhouse = { timestamp: 0, temperature: 0, humidity: 0, co2: 0, airQuality: 0 };

export const greenhouseReducer = createReducer(
    initialState,
    on(ThingyApiActions.receivedGreenhouseData, (_, { greenhouse }) => greenhouse)
);