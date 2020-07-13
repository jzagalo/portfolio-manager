import { AccountModel } from "@/store/account-model";
import { SecurityModel } from "@/store/security-model";

export interface IAccountSecurityModelConfig {
    accountId: number;
    id: number;
    security?: SecurityModel;
    securityId: number;
    shares: number;
}

export class AccountSecurityModel {
    private _id: number;
    private _account?: AccountModel;
    private _accountId: number;
    private _security?: SecurityModel;
    private _securityId: number;
    private _shares: number;

    public get account() {
        if (typeof this._account === "undefined") {
            throw new Error("The account has not been defined.");
        }
        return this._account;
    }
    public set account(account: AccountModel) {
        this._account = account;
    }
    public get accountId() {
        return this._accountId;
    }
    public set accountId(accountId: number) {
        this._accountId = accountId;
    }
    public get id() {
        return this._id;
    }
    public set id(id: number) {
        this._id = id;
    }
    public get security() {
        if (typeof this._security === "undefined") {
            throw new Error("The security has not been defined.");
        }
        return this._security;
    }
    public set security(security: SecurityModel) {
        this._security = security;
    }
    public get securityId() {
        return this._securityId;
    }
    public get shares() {
        return this._shares;
    }
    public set shares(value: number) {
        this._shares = value;
    }
    public get value() {
        return this.shares * this.security.last;
    }

    constructor(config: IAccountSecurityModelConfig) {
        this._accountId = config.accountId;
        this._id = config.id;
        this._securityId = config.securityId;
        this._shares = config.shares;

        if (typeof config.security !== "undefined") {
            this._security = config.security;
        }
    }
}