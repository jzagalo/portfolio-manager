import { AccountModel } from "@/store/account-model";

export interface IAccountState {
    index: number;
    items: AccountModel[]
}