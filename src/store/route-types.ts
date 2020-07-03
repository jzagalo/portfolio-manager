import { IRoute } from "@/components/routing";

export interface IRouteState {
    history: IRoute[];
}

export type PushRoutePayload = IRoute;
export type PopRoutePayload = void;