import { IAccountDepositModelConfig, AccountDepositModel } from "@/store/account-deposit-model";
import { initialState as accountState } from "@/store/account-initial-state";
import { IAccountDepositModelState } from "@/store/account-types";

const deposits: AccountDepositModel[] = [];

function createDeposit(id: number, config: Omit<IAccountDepositModelConfig, "id">) {
    const deposit = new AccountDepositModel({ id, ...config });
    deposits.push(deposit);
    return (id += 1);
}

let index = 1;  
if (process.env.NODE_ENV === "development") {
    index = createDeposit(index, { accountId: accountState.items[0].id, amount: 2300, date: new Date(2019, 0, 4) });
    index = createDeposit(index, { accountId: accountState.items[0].id, amount: 375, date: new Date(2018, 3, 19) });
    index = createDeposit(index, { accountId: accountState.items[0].id, amount: 5000, date: new Date(2017, 5, 14) });
    index = createDeposit(index, { accountId: accountState.items[0].id, amount: 10000, date: new Date(2015, 8, 27) });
}

export const initialState: IAccountDepositModelState = {
    index,
    items: deposits,
};