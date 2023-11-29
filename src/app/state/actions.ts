import { createActionGroup, emptyProps, props } from "@ngrx/store";
import { Greenhouse } from "./greenhouse/greenhouse.model";
import { Plant } from "./plant/plant.model";
import { User } from "./user/user.model";

export const ApiActions = createActionGroup({
    source: 'Api',
    events: {
        'Received greenhouse data': props<{ greenhouse: Greenhouse }>(),
        'Received users': props<{ users: User[] }>(),
        'Added user': props<{ user: User }>(),
        'Deleted user': props<{ userId: number }>(),
        'updated user': props<{ user: User }>(),
        'Received plants': props<{ plants: Plant[] }>(),
        'Added plant': props<{ plant: Plant }>(),
        'Deleted plant': props<{ plantId: number }>(),
        'updated plant': props<{ plant: Plant }>(),
        'error occured': emptyProps()
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
      'Log Out': emptyProps(),
      'SignUp': props<{ email: string; password: string, name: string }>(),
  },
});
