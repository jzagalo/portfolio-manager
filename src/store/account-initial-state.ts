import { AccountModel, IAccountConfig } from "@/store/account-model";
import { IAccountState, IAccountModelState } from "@/store/account-types";

const accounts: AccountModel[] = [];

function createAccount(id: number, config: Omit<IAccountConfig , "id">) {
    accounts.push(new AccountModel({ id, ...config}));
    return (id += 1);
}

let index = 1;
if(process.env.NODE_ENV === "development"){
   index = createAccount(index, { cash: 5684, name : "name-1"});
   index = createAccount(index, { cash: 0, name: "name-2" });
}

export const initialState: IAccountModelState = {
    index,
    items: accounts,
}