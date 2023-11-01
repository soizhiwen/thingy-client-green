import { createActionGroup, props } from "@ngrx/store";
import { Greenhouse } from "../thingyApi/greenhouse.model";

export const ThingyApiActions = createActionGroup({
    source: 'Thingy Api',
    events: {
        'Received greenhouse data': props<{ greenhouse: Greenhouse }>()
    },
});