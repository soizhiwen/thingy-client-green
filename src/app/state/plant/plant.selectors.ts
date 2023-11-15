import { createFeatureSelector, createSelector } from "@ngrx/store";
import { Plant } from "./plant.model";

export const selectPlants = createFeatureSelector<Plant[]>('plants');
export const selectPlantOfId = (id: number) =>
    createSelector(
        selectPlants,
        (plants: Plant[]) => {
            for (const plant of plants) {
                if (plant.id == id) {
                    return plant;
                }
            }
            return undefined;
        }
    )