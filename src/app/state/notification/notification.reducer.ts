import { Notification } from './notification.model';
import { createReducer, on } from "@ngrx/store";
import { NotificationActions } from "../actions";

export const initialState: Notification[] = [];

export const NotificationReducer = createReducer(
    initialState,
    on(NotificationActions.receivedNotifications, (_, { notifications }) => notifications),
    on(NotificationActions.receivedPlantNotifications, (_, { notifications }) => notifications),
    on(NotificationActions.updatedNotification, (state, { notification }) => updateNotification(state, notification)),
);

function updateNotification(state: Notification[], notification: Notification): Notification[] {
    const newState: Notification[] = [];
    state.forEach(u => {
        if (u.id == notification.id) {
            newState.push(notification);
        } else {
            newState.push(u);
        }
    })
    return newState;
}
