import { createReducer, on } from "@ngrx/store";
import { ApiActions } from "../actions";
import { User } from "./user.model";

export const initialState: User[] = [{
    id: 0,
    name: 'User',
    role: 'User',
    email: 'email@email.com'
},]

export const userReducer = createReducer(
    initialState,
    on(ApiActions.receivedUsers, (_, { users }) => users),
    on(ApiActions.addedUser, (state, { user }) => [...state, user]),
    on(ApiActions.updatedUser, (state, { user }) => updateUser(state, user)),
    on(ApiActions.deletedUser, (state, { userId }) => deleteUser(state, userId))
);

function updateUser(state: User[], user: User): User[] {
    const newState: User[] = [];
    state.forEach(u => {
        if (u.id == user.id) {
            newState.push(user);
        } else {
            newState.push(u);
        }
    })
    return newState;
}

function deleteUser(state: User[], userId: number): User[] {
    const newState: User[] = [];
    state.forEach(u => {
        if (u.id != userId) {
            newState.push(u);
        }
    })
    return newState;
}