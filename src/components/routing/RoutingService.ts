import { Subject } from "rxjs";
import { Routes } from "../animations/types";

export class RoutingService{
    private readonly _navigate = new Subject<Routes>();
    private readonly _navigate$ = this._navigate.asObservable();

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