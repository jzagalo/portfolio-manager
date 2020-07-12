import { AccountModel } from "@/store/account-model";
import { GETTER_ACCOUNT, GETTER_ACCOUNTS, STATE_ACCOUNTS } from "@/store/store-constants";

export type GetterAccount = (id: number) => AccountModel;
export type PayloadAddAccount = AccountModel;
export type PayloadRemoveAccount = number;

export interface IAccountGetters {
    [GETTER_ACCOUNT]: GetterAccount;
    [GETTER_ACCOUNTS]: AccountModel[];
}
export interface IAccountModelState {
    index: number;
    items: AccountModel[];
}

export interface IAccountState{
    [STATE_ACCOUNTS]: IAccountModelState;
}

export type AddAccountPayload = string;
export type RemoveAccountPayload = number;
