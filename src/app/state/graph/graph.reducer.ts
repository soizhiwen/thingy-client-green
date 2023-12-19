import { createReducer, on } from "@ngrx/store";
import { ApiActions } from "../actions";
import { Graph } from "./graph.model";

export const initialState: Graph[] = [];

export const graphReducer = createReducer(
    initialState,
    on(ApiActions.receivedGraphData, (_, { data }) => data)
);