import { Notification } from './notification.model';
import { createFeatureSelector, createSelector } from "@ngrx/store";

export const selectNotifications = createFeatureSelector<Notification[]>('notification');

export const selectNotificationOfId = (id: number) =>
    createSelector(
      selectNotifications,
        (notifications: Notification[]) => {
            for (const notification of notifications) {
                if (notification.id == id) {
                    return notification;
                }
            }
            return undefined;
        }
    )

export const selectPlantNotifications = createFeatureSelector<Notification[]>('plantNotification');

export const selectNotificationOfPlantId = (id: number) =>
    createSelector(
      selectPlantNotifications,
        (notifications: Notification[]) => {
            for (const notification of notifications) {
                if (notification.id == id) {
                    return notification;
                }
            }
            return undefined;
        }
    )

