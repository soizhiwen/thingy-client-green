import { Notification } from './notification.model';
import { createReducer, on } from "@ngrx/store";
import { NotificationActions } from "../actions";

export const initialState: Notification[] = [];

export const NotificationReducer = createReducer(
    initialState,
    on(NotificationActions.receivedNotifications, (_, { notifications }) => notifications),
    on(NotificationActions.updatedNotification, (state, { notification }) => updateNotification(state, notification)),
);

export const plantNotificationReducer = createReducer(
  initialState,
  on(NotificationActions.receivedPlantNotifications, (_, { plantNotifications }) => plantNotifications)
);

function updateNotification(state: Notification[], notification: Notification[]): Notification[] {
    const newState: Notification[] = [];
    notification.forEach(u => {
       newState.push(u);
    })

    return newState;
}
