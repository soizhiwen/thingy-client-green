import { createActionGroup, emptyProps, props } from "@ngrx/store";
import { Greenhouse } from "./greenhouse/greenhouse.model";
import { Plant } from "./plant/plant.model";
import { User } from "./user/user.model";

export const ApiActions = createActionGroup({
    source: 'Api',
    events: {
        'Received greenhouse data': props<{ greenhouse: Greenhouse }>(),
        'Received plants': props<{ plants: Plant[] }>(),
        'Received users': props<{ users: User[] }>(),
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

export const UserActions = createActionGroup({
    source: 'Users',
    events: {
        'Load users': emptyProps(),
        'Add user': props<{ user: User }>(),
        'Update user': props<{ user: User }>(),
        'Delete user': props<{ userId: number }>()
    },
});

export const AuthActions = createActionGroup({
  source: 'Auth',
  events: {
      'Set Token': props<{ token: string }>(),
      'Set user': props<{ user: User }>(),
      'Set user Error': props<{message: string}>(),
      'Remove Token': emptyProps(),
      'Login': props<{ email: string; password: string }>(),
      'LoginError': props<{ message: string }>(),
      'Log Out': emptyProps()
  },
});
