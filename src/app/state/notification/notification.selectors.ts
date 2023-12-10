import { Notification } from './notification.model';
import { createFeatureSelector, createSelector } from "@ngrx/store";

export const selectNotifications = createFeatureSelector<Notification[]>('notifications');

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
