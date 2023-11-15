import { createReducer, on } from "@ngrx/store";
import { ApiActions } from "../actions";
import { Plant } from "./plant.model";

export const initialState: Plant[] = [{
    id: 0,
    name: "Tomato",
    harvest_date: new Date(2023, 11, 21),
    temperature: 20,
    humidity: 80,
    co2: 100,
    airQuality: 100
},]

export const plantReducer = createReducer(
    initialState,
    on(ApiActions.receivedPlants, (_, { plants }) => plants)
);