import { createActionGroup, emptyProps, props } from "@ngrx/store";
import { Greenhouse } from "./greenhouse/greenhouse.model";
import { Plant } from "./plant/plant.model";
import { User } from "./user/user.model";
import { Notification } from './notification/notification.model';
import { AppId } from "../api/AppId";
import { Graph } from "./graph/graph.model";



export const ApiActions = createActionGroup({
    source: 'Api',
    events: {
        'Received current greenhouse data': props<{ greenhouse: Greenhouse }>(),
        'Received graph data': props<{ data: Graph[] }>(),
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
        'Load current greenhouse data': emptyProps(),
        'Load greenhouse graph data': props<{ appId: AppId }>(),
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
        'Set user': props<{ userId?: number }>(),
        'Set user Error': props<{ message: string }>(),
        'Remove Token': emptyProps(),
        'Login': props<{ email: string; password: string }>(),
        'LoginError': props<{ message: string, status: number }>(),
        'Log Out': emptyProps(),
        'SignUp': props<{ email: string; password: string, name: string }>(),
        'Logged in': emptyProps(),
    },
});

export const NotificationActions = createActionGroup({
  source: 'Notifications',
  events: {
    'Received notifications': props<{ notifications: Notification[] }>(),
    'Received plant notifications': props<{ plantNotifications: Notification[] }>(),
    'Update notification': props<{ notification: Notification[] }>(),
    'Updated notification': props<{ notification: Notification[] }>(),
    'Load notifications': emptyProps(),
    'Load notifications by plant': props<{ plantId: number }>(),
  },
});
