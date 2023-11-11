import { createFeatureSelector, createSelector } from "@ngrx/store";
import { Plant } from "./plant.model";

export const selectPlants = createFeatureSelector<Plant[]>('plants');