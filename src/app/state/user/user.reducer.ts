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
    on(ApiActions.receivedUsers, (_, { users }) => users)
);