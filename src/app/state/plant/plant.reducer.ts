import { createReducer, on } from "@ngrx/store";
import { ApiActions } from "../actions";
import { Plant } from "./plant.model";

export const initialState: Plant[] = [];

export const plantReducer = createReducer(
    initialState,
    on(ApiActions.receivedPlants, (_, { plants }) => plants),
    on(ApiActions.addedPlant, (state, { plant }) => [...state, plant]),
    on(ApiActions.updatedPlant, (state, { plant }) => updatePlant(state, plant)),
    on(ApiActions.deletedPlant, (state, { plantId }) => deletePlant(state, plantId))
);

function updatePlant(state: Plant[], plant: Plant): Plant[] {
    const newState: Plant[] = [];
    state.forEach(u => {
        if (u.id == plant.id) {
            newState.push(plant);
        } else {
            newState.push(u);
        }
    })
    return newState;
}

function deletePlant(state: Plant[], plantId: number): Plant[] {
    const newState: Plant[] = [];
    state.forEach(u => {
        if (u.id != plantId) {
            newState.push(u);
        }
    })
    return newState;
}