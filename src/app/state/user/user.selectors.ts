import { createFeatureSelector, createSelector } from "@ngrx/store";
import { User } from "./user.model";

export const selectUsers = createFeatureSelector<User[]>('users');
export const selectUserOfId = (id: number) =>
    createSelector(
        selectUsers,
        (users: User[]) => {
            for (const user of users) {
                if (user.id == id) {
                    return user;
                }
            }
            return undefined;
        }
    )