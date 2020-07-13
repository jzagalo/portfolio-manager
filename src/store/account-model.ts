import { AccountDepositModel, AccountSecurityModel } from "@/store";

export interface IAccountConfig{
    cash: number;
    id: number;
    name: string;
}

export class AccountModel {
    private _id: number;
    private _cash = 0;
    private _name: string;
    private _deposits: AccountDepositModel[] = [];
    private _securities: AccountSecurityModel[] = [];

    public get id(){
        return this._id;
    }

    public set id(id: number){
        this.id = id;
    }
    
    public get cash() {
        return this._cash;
    }
    
    public set cash(value : number) {
        this._cash = value;
    }
    
    
    public get name(){
        return this._name;
    }

    public set name(name: string){
        this._name = name;
    }
    
    public get deposits() {
        return this._deposits;
    }
    
    public set deposits(deposits : AccountDepositModel[]) {
        this._deposits = deposits;
    }
    
    public get securities() {
        return this._securities;
    }

    public set securities(securities : AccountSecurityModel[]) {
        this._securities = securities;
    }    

    constructor(config: IAccountConfig){
        this._id = config.id;
        this._name = config.name;
        this._cash = config.cash;
    }
}