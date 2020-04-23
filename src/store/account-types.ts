import { AccountModel } from "@/store/account-model";

export interface IAccountState {
    index: number;
    items: AccountModel[];
}

export type AddAccountPayload = string;
export type RemoveAccountPayload = number;