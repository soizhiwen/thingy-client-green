import { Notification } from './notification.model';
import { createFeatureSelector, createSelector } from "@ngrx/store";

export const selecNotifications = createFeatureSelector<Notification[]>('notifications');

export const selectNotificationOfId = (id: number) =>
    createSelector(
      selecNotifications,
        (notifications: Notification[]) => {
            for (const notidication of notifications) {
                if (notidication.id == id) {
                    return notidication;
                }
            }
            return undefined;
        }
    )
