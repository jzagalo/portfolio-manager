import { AccountModel } from "@/store/account-model";

export interface IAccountDepositModelConfig {
    accountId: number;
    amount: number;
    date: Date;
    id: number;
}

export class AccountDepositModel {
    private _account?: AccountModel;
    private _accountId: number;
    private _amount: number;
    private _date: Date;
    private _id: number;

    
    public get account() {
       if(typeof this._account === "undefined"){
           throw new Error("This account has not been defined");
       }

       return this._account;
    }

    public set account(account: AccountModel) {
        this._account  = account;
    }    

    public set accountId(accountId: number) {
        this._accountId  = accountId;
    }
    
    public get accountId() {
        return this._accountId;
    }

    public get amount() {
        return this._amount;
    }   

    public set amount(amount: number) {
         this._amount = amount;
    }

    public get date()  {
        return this._date;
    }

    public set date(date: Date) {
        this._date = date;
    }

    public get id(){
        return this._id;
    }

    public set id(id: number){
        this._id = id;
    }    
   
    constructor(config: IAccountDepositModelConfig) {
        this._accountId = config.accountId;
        this._amount = config.amount;
        this._date = config.date;
        this._id = config.id;        
    }   
}