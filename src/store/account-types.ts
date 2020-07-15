import { AccountModel } from "@/store/account-model";
import { GETTER_ACCOUNT, GETTER_ACCOUNTS, STATE_ACCOUNTS,
            STATE_ACCOUNTS_DEPOSITS, STATE_ACCOUNTS_SECURITIES,
            GETTER_ACCOUNT_DEPOSIT, GETTER_ACCOUNT_DEPOSITS,
            GETTER_ACCOUNT_SECURITIES, GETTER_ACCOUNT_SECURITY,
        } from "@/store/store-constants";
import { AccountDepositModel } from "@/store/account-deposit-model";
import { AccountSecurityModel } from "@/store/account-security-model";


export type PayloadAddAccountDeposit = AccountDepositModel;
export type PayloadUpdateAccountDeposit = AccountDepositModel;
export type GetterAccount = (id: number) => AccountModel;
export type PayloadAddAccount = AccountModel;
export type PayloadRemoveAccount = number;
export type GetterAccountDeposit = (id: number) => AccountDepositModel;
export type GetterAccountDeposits = (accountId: number) => AccountDepositModel[];
export type GetterAccountSecurity = (id: number) => AccountSecurityModel;
export type GetterAccountSecurities = (accountId: number) => AccountSecurityModel[];

export interface IAccountGetters {
    [GETTER_ACCOUNT]: GetterAccount;
    [GETTER_ACCOUNTS]: AccountModel[];
    [GETTER_ACCOUNT_DEPOSIT]: GetterAccountDeposit;
    [GETTER_ACCOUNT_DEPOSITS]: GetterAccountDeposits;
    [GETTER_ACCOUNT_SECURITIES]: GetterAccountSecurities;
    [GETTER_ACCOUNT_SECURITY]: GetterAccountSecurity;
}
export interface IAccountModelState {
    index: number;
    items: AccountModel[];
}

export interface IAccountDepositModelState{
    index: number;
    items: AccountDepositModel[];
}

export interface IAccountSecurityModelState{
    index: number;
    items: AccountSecurityModel[];
}

export interface IAccountState{
    [STATE_ACCOUNTS]: IAccountModelState;
    [STATE_ACCOUNTS_DEPOSITS]: IAccountDepositModelState;
    [STATE_ACCOUNTS_SECURITIES]:IAccountSecurityModelState;
}

export type AddAccountPayload = string;
export type RemoveAccountPayload = number;
