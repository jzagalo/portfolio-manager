import Vue, { VueConstructor} from "vue";
import { RouteConfig } from "vue-router";

type VuePromiseFn = () => Promise<typeof import("*.vue")>;

export interface RouteEntryConfig {
    component: any;
    name: string;
    path: string;
   
}

export class RouteEntry{
    private readonly _component: VueConstructor<Vue> | VuePromiseFn;
    private readonly _name: string;
    private readonly _path: string;

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

    constructor(config: RouteEntryConfig){
        this._component = config.component;
        this._name = config.name;
        this._path = config.path;
    }

}