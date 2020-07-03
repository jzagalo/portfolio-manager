//import { Dictionary } from "lodash";
import { Dictionary } from "vue-router/types/router";
import { Routes } from "@/components/routing";

export interface IRouteOptions {
    query?: Dictionary<string | Array<string | null>>;
}

export interface IRoute extends IRouteOptions{
    id: Routes;
    name: string;
}