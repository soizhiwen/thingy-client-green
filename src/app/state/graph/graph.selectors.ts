import { createFeatureSelector } from "@ngrx/store";
import { Graph } from "./graph.model";

export const selectGraphData = createFeatureSelector<Graph[]>('graph');
