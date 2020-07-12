export interface IAccountConfig{
    id: number;
    name: string;
}

export class AccountModel {
    private _id: number;
    private _name: string;

    public get id(){
        return this._id;
    }

    public set id(id: number){
        this.id = id;
    }
    public get name(){
        return this._name;
    }

    public set name(name: string){
        this._name = name;
    }

    constructor(config: IAccountConfig){
        this._id = config.id;
        this._name = config.name;
    }
}