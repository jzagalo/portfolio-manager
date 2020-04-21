import Vue, { VueConstructor} from "vue";
import { RouteConfig } from "vue-router";
import { Routes } from "@/components/routing";

type VuePromiseFn = () => Promise<typeof import("*.vue")>;

export interface RouteEntryConfig {
    component: any;
    name: string;
    path: string;
    parent: RouteEntry | null; 
    route: Routes;
}

export class RouteEntry{
    private readonly _component: VueConstructor<Vue> | VuePromiseFn;
    private readonly _name: string;
    private readonly _path: string;
    private readonly _parent: RouteEntry | null;
    private readonly _route: Routes;

    public get component(){
        return this._component;
    }

    public get config(): RouteConfig{
        return {
            component: this._component,
            name: this._name,
            path: this._path,           
        }
    }  

    public get name() { return this._name; }
    public get path() { return this._path; }
    public get parent() { return this._parent; }
    public get route(){ return this._route; }

    constructor(config: RouteEntryConfig){
        this._component = config.component;
        this._name = config.name;
        this._path = config.path;
        this._parent = config.parent;
        this._route = config.route;
    }

    public isChildOf(entry: RouteEntry) {
        return this._parent === entry;
    }

}