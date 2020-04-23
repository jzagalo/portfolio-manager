import { AccountModel } from "@/store/account-model";
import { IAccountState } from "@/store/account-types";

const accounts: AccountModel[] = [];

let index = 1;
if(process.env.NODE_ENV === "development"){
    accounts.push(new AccountModel({ id: index, name: "name-1"}));
    index += 1;
    accounts.push(new AccountModel({ id: index, name: "name-2" }));
    index += 1;
}

export const initialState: IAccountState = {
    index,
    items: accounts,
}