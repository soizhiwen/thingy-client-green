import { createActionGroup, emptyProps, props } from "@ngrx/store";
import { Greenhouse } from "./greenhouse/greenhouse.model";
import { Plant } from "./plant/plant.model";

export const ApiActions = createActionGroup({
    source: 'Api',
    events: {
        'Received greenhouse data': props<{ greenhouse: Greenhouse }>(),
        'Received plants': props<{ plants: Plant[] }>(),
    },
});

export const DashboardActions = createActionGroup({
    source: 'Dashboard',
    events: {
        'Load greenhouse data': emptyProps(),
    },
});

export const PlantActions = createActionGroup({
    source: 'Plants',
    events: {
        'Load plants': emptyProps(),
        'Add plant': props<{ plant: Plant }>(),
        'Update plant': props<{ plant: Plant }>(),
        'Delete plant': props<{ plantId: number }>()
    },
});