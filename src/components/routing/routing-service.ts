import Vue from "vue";
import Router from "vue-router";
import { RouteEntry } from "@/components/routing/route-entry";
import { Routes } from "../animations/types";
import { Subject } from "rxjs";
import Home from "@/views/Home.vue";
import { Store } from "vuex";
import { IStoreState, STATE_ROUTES } from "@/store";


Vue.use(Router);

const home = new RouteEntry({
    component: Home,
    name: "home",
    parent: null,
    path: "/",
    route: Routes.Home
});

const about = new RouteEntry({
    component: () => import(/* webpackChunkName: "about" */ "../../views/About.vue"),
    name: "about",
    parent: home,
    path: "/about",  
    route: Routes.About 
});

const accounts = new RouteEntry({
    component: () => import(/* webpackChunkName: "about" */ "../../views/Accounts.vue"),
    name: "accounts",
    parent: home,
    path: "/accounts",  
    route: Routes.Accounts 
});

const securities = new RouteEntry({
    component: () => import(/* webpackChunkName: "about" */ "../../views/Securities.vue"),
    name: "securities",
    parent: home,
    path: "/securities",  
    route: Routes.Securities 
});

export class RoutingService {
    private readonly _navigate = new Subject<Routes>();
    private readonly _navigate$ = this._navigate.asObservable(); 
    private readonly _navigateBack = new Subject<Routes>();
    private readonly _navigateBack$ = this._navigateBack.asObservable();
    private readonly _routeChanged = new Subject<void>();
    private readonly _routeChanged$ = this._routeChanged.asObservable();

    public get routeChanged$(){
        return this._routeChanged$;
    }
    
    private readonly _routes = new Map<Routes, RouteEntry>([
        [Routes.About, about],
        [Routes.Home, home ],       
        [Routes.Accounts, accounts ],
        [Routes.Securities, securities ]
    ]);  

    private readonly _values = Array.from(this._routes.values());
    private readonly _router = new Router({
        base: process.env.BASE_URL,
        mode: "history",
        routes: this._values.map((x) => x.config)
    });

    public get navigateBack$(){
        return this._navigateBack$;
    }

    constructor(private readonly _store: Store<IStoreState>){

    }

    public back = () =>{
       if(this._store.state[STATE_ROUTES].history.length === 0) return;

       const to = this._store.state[STATE_ROUTES].history[0];
       this._navigateBack.next(to);
       this._routeChanged.next();
    }

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

    private readonly _currentPromise = new Promise<RouteEntry>((resolve, _) =>{
        this._router.onReady(() => resolve(this.current));
    })

    public async isCurrentRouteAsync(route: Routes){
        const current = await this.currentAsync;
        return current.route === route;
    }

    public get currentAsync(){
        return this._currentPromise;
    }

    public get router(){
        return this._router;
    }

    public get navigate$(){
        return this._navigate$;
    }

    public complete(){
        this._navigate.complete();
        this._routeChanged.next();
    }

    public navigateTo = (to: Routes) => {
        if(this.current.isSameRoute(to)){
            return;
        }
        
        this._navigate.next(to)
    }
}