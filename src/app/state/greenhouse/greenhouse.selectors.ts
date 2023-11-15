import { Store, createFeatureSelector, createSelector } from "@ngrx/store";
import { Greenhouse } from "./greenhouse.model";

const selectCurrentGreenhouseData = createFeatureSelector<Greenhouse>('greenhouse');

export const selectCurrentTemperature = createSelector(selectCurrentGreenhouseData, (greenhouse) => greenhouse.temperature);
export const selectCurrentHumidity = createSelector(selectCurrentGreenhouseData, (greenhouse) => greenhouse.humidity);
export const selectCurrentCo2 = createSelector(selectCurrentGreenhouseData, (greenhouse) => greenhouse.co2);
export const selectCurrentAirQuality = createSelector(selectCurrentGreenhouseData, (greenhouse) => greenhouse.airQuality);