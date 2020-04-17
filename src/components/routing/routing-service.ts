import Vue from "vue";
import Router from "vue-router";
import { RouteEntry } from "@/components/routing/route-entry";
import { Routes } from "../animations/types";
import { Subject } from "rxjs";

import Home from "@/views/Home.vue";

Vue.use(Router);

const home = new RouteEntry({
    component: Home,
    name: "home",
    path: "/",
});

const about = new RouteEntry({
    component: () => import(/* webpackChunkName: "about" */ "../../views/About.vue"),
    name: "about",
    path: "/about",   
});

export class RoutingService {
    private readonly _navigate = new Subject<Routes>();
    private readonly _navigate$ = this._navigate.asObservable();

    private readonly _routes = new Map<Routes, RouteEntry>([
        [Routes.About, about],
        [Routes.Home, home ]
    ]);

    private readonly _values = Array.from(this._routes.values());
    private readonly _router = new Router({
        base: process.env.BASE_URL,
        mode: "history",
        routes: this._values.map((x) => x.config)
    });

    public get current() {
        return this.entryByName(this.router.currentRoute.name as string);
    }

    public find = (route: Routes) => {
        const entry = this._routes.get(route);
        if(typeof(entry) === "undefined"){
            throw new Error(` A route for (${route}) ${Routes[route]} has not been defined`);
        }
        return entry;
    }

    private entryByName = (name: string) => {
        const route = this._values.find((x) => x.name === name);
        if(typeof(route) === "undefined"){
            throw new Error(` A route with with name: ${name} has not been defined`);
        }

        return route;
    }

    public get router(){
        return this._router;
    }

    public get navigate$(){
        return this._navigate$;
    }

    public complete(){
        this._navigate.complete();
    }

    public navigateTo = (to: Routes) => {
        this._navigate.next(to)
    }
}