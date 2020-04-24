import { Routes } from "@/components/routing";

export interface IRouteState {
    history: Routes[];
}

export type PushRoutePayload = Routes;
export type PopRoutePayload = void;