import {  Store } from "vuex";
import moment from "moment";
import { ACTION_ADD_ACCOUNT, ACTION_REMOVE_ACCOUNT,
         ACTION_ADD_ACCOUNT_SECURITY, ACTION_UPDATE_ACCOUNT_SECURITY,
         ACTION_REMOVE_ACCOUNT_SECURITY, MUTATION_REMOVE_ACCOUNT_SECURITY,
         MUTATION_ADD_ACCOUNT_SECURITY, MUTATION_UPDATE_ACCOUNT_SECURITY,
         ACTION_ADD_ACCOUNT_DEPOSIT, ACTION_UPDATE_ACCOUNT_DEPOSIT,
         MUTATION_ADD_ACCOUNT_DEPOSIT, MUTATION_UPDATE_ACCOUNT_DEPOSIT,
         MUTATION_ADD_ACCOUNT, MUTATION_REMOVE_ACCOUNT,
         STATE_ACCOUNTS, GETTER_ACCOUNT, GETTER_ACCOUNTS,
         STATE_ACCOUNTS_DEPOSITS, STATE_ACCOUNTS_SECURITIES,
         GETTER_ACCOUNT_DEPOSIT, GETTER_ACCOUNT_DEPOSITS,
         GETTER_ACCOUNT_SECURITIES, GETTER_ACCOUNT_SECURITY,
         GETTER_SECURITY,
        }
    from "./store-constants";
import { IStoreState, StoreGetterTree, IStoreGetters, } from "./store-types";
import { AccountModel } from "./account-model";
import { initialState as accountState } from "@/store/account-initial-state";
import { initialState as depositState } from "@/store/account-deposit-initial-state";
import { initialState as securityState } from "@/store/account-security-initial-state";
import { IAccountGetters, IAccountState,
        PayloadAddAccount, PayloadRemoveAccount, PayloadRemoveAccountSecurity,
        PayloadAddAccountSecurity, PayloadUpdateAccountSecurity,
        PayloadAddAccountDeposit, PayloadUpdateAccountDeposit,
         } from "@/store/account-types";
import { AddAccountPayload, RemoveAccountPayload, StoreActionTree,
        StoreContext, StoreMutationTree } from "@/store";
import { StoreActions, StoreActionValidator } from "@/store/store-action-validators";
import { add, findById, remove, undefinedMessage, sort } from "@/store/functions";

const storeActionValidator = new StoreActionValidator();

export const accountActions: StoreActionTree = {
    [ACTION_ADD_ACCOUNT](this: Store<IStoreState>, { commit}: StoreContext, name: AddAccountPayload){
        commit(MUTATION_ADD_ACCOUNT, name);
    },
    [ACTION_REMOVE_ACCOUNT](this: Store<IStoreState>, {commit}: StoreContext, id: RemoveAccountPayload){
        commit(MUTATION_REMOVE_ACCOUNT, id);
    },
    [ACTION_ADD_ACCOUNT_DEPOSIT](this, { commit }, payload: PayloadAddAccountDeposit) {
        commit(MUTATION_ADD_ACCOUNT_DEPOSIT, payload);
    },
    [ACTION_UPDATE_ACCOUNT_DEPOSIT](this, { commit }, payload: PayloadUpdateAccountDeposit) {
        commit(MUTATION_UPDATE_ACCOUNT_DEPOSIT, payload);
    },
    [ACTION_ADD_ACCOUNT_SECURITY](this, { commit }, payload: PayloadAddAccountSecurity) {
        commit(MUTATION_ADD_ACCOUNT_SECURITY, payload);
    },
    [ACTION_UPDATE_ACCOUNT_SECURITY](this, { commit }, payload: PayloadUpdateAccountSecurity) {
        console.log("PAyload");
        console.log(payload);
        commit(MUTATION_UPDATE_ACCOUNT_SECURITY, payload);
    },
    [ACTION_ADD_ACCOUNT_SECURITY](this, { commit }, payload: PayloadAddAccountSecurity) {
        const state = this.state[STATE_ACCOUNTS_SECURITIES];
        const accountSecurity = state.items.find(
            (x) => x.accountId === payload.accountId && x.securityId === payload.securityId,
        );

        if (typeof accountSecurity === "undefined") {
            commit(MUTATION_ADD_ACCOUNT_SECURITY, payload);
        } else {
            payload.id = accountSecurity.id;
            payload.shares += accountSecurity.shares;
            commit(MUTATION_UPDATE_ACCOUNT_SECURITY, payload);
        }
    },
    [ACTION_REMOVE_ACCOUNT_SECURITY](this, { commit }, payload: PayloadRemoveAccountSecurity) {
        commit(MUTATION_REMOVE_ACCOUNT_SECURITY, payload);
    },
}

export const accountGetters: StoreGetterTree = {
    [GETTER_ACCOUNT]: (state, getters: IAccountGetters) => {
        return (id: number) => {
            const account = findById(state[STATE_ACCOUNTS], id)!;

            storeActionValidator
                .begin()
                .while(StoreActions.Getting)
                .throwIf(account)
                .isUndefined(undefinedMessage("account", id, state[STATE_ACCOUNTS].index));

            account.deposits = getters[GETTER_ACCOUNT_DEPOSITS](account.id);
            account.securities = getters[GETTER_ACCOUNT_SECURITIES](account.id);

            return account;
        };
    },
    [GETTER_ACCOUNTS]: (state, getters: IAccountGetters) => {
        return state[STATE_ACCOUNTS].items.map((x) => getters[GETTER_ACCOUNT](x.id));
    },
    [GETTER_ACCOUNT_DEPOSIT]:(storeState, getters: IAccountGetters) => {
        return(id: number) => {
            const deposit = findById(storeState[STATE_ACCOUNTS_DEPOSITS], id)!;

            storeActionValidator
                .begin()
                .while(StoreActions.Getting)
                .throwIf(deposit)
                .isUndefined(undefinedMessage("deposit", id,
                storeState[STATE_ACCOUNTS_DEPOSITS].index));
            deposit.account = getters[GETTER_ACCOUNT](deposit.accountId);

            return deposit;
        }
    },
    [GETTER_ACCOUNT_DEPOSITS]: (storeState) => {
        return(accountId: number) => {
            return storeState[STATE_ACCOUNTS_DEPOSITS].items.filter((x)  => x.accountId === accountId);
        }
    },
    [GETTER_ACCOUNT_SECURITIES]: (storeState, getters: IStoreGetters) => {
        return (accountId: number) => {
            const accountSecurities = storeState[STATE_ACCOUNTS_SECURITIES].items.filter(
                (x) => x.accountId === accountId,
            );

            accountSecurities.forEach((x) => {
                x.security = getters[GETTER_SECURITY](x.securityId);
            });

            const sorted = sort(accountSecurities, (x) => x.security.symbol);

            return sorted;
        }
    },
    [GETTER_ACCOUNT_SECURITY]: (storeState, getters: IStoreGetters) => {
        return (id: number) => {
            const accountSecurity = findById(storeState[STATE_ACCOUNTS_SECURITIES],id)!;

            storeActionValidator
                .begin()
                .while(StoreActions.Getting)
                .throwIf(accountSecurity)
                .isUndefined(undefinedMessage("accountSecurity", id,storeState[STATE_ACCOUNTS_SECURITIES].index));

            accountSecurity.account = getters[GETTER_ACCOUNT](accountSecurity.accountId);
            accountSecurity.security = getters[GETTER_SECURITY](accountSecurity.securityId);

            return accountSecurity;
        }
    },

}

export const accountMutations: StoreMutationTree = {
    [MUTATION_ADD_ACCOUNT](state: IStoreState, payload: AddAccountPayload){
        const account = new AccountModel({ id: state[STATE_ACCOUNTS].index, name: payload , cash: 0 });
        state[STATE_ACCOUNTS].items = [...state[STATE_ACCOUNTS].items, account].sort((a,b) =>{
            const aName = a.name.toUpperCase();
            const bName = b.name.toUpperCase();
            if(aName < bName){ return -1; }
            if(aName > bName){ return 1;  }
            return 0;
        });
        state[STATE_ACCOUNTS].index += 1;
    },
    [MUTATION_REMOVE_ACCOUNT](state: IStoreState, payload: RemoveAccountPayload){
        state[STATE_ACCOUNTS].items = state[STATE_ACCOUNTS].items.filter((x) => x.id !== payload);
    },
    [MUTATION_ADD_ACCOUNT_DEPOSIT](storeState, payload: PayloadAddAccountDeposit) {
        add(storeState[STATE_ACCOUNTS_DEPOSITS], payload, (x) => moment(x.date).valueOf(), { descending: true });
    },
    [MUTATION_UPDATE_ACCOUNT_DEPOSIT](storeState, payload: PayloadUpdateAccountDeposit) {
        const state = storeState[STATE_ACCOUNTS_DEPOSITS];
        const deposit = findById(state, payload.id)!;

        storeActionValidator
            .begin()
            .while(StoreActions.Updating)
            .throwIf(deposit)
            .isUndefined(undefinedMessage("deposit", payload.id, state.index));

        deposit.accountId = payload.accountId;
        deposit.amount = payload.amount;
        deposit.date = payload.date;

        state.items = sort(state.items, (x) => moment(x.date).valueOf(), { descending: true });
    },
    [MUTATION_ADD_ACCOUNT_SECURITY](storeState, payload: PayloadAddAccountSecurity) {
        add(storeState[STATE_ACCOUNTS_SECURITIES], payload);
    },
    [MUTATION_UPDATE_ACCOUNT_SECURITY](storeState, payload: PayloadUpdateAccountSecurity) {
        const state = storeState[STATE_ACCOUNTS_SECURITIES];
        const security = findById(state, payload.id)!;

        storeActionValidator
            .begin()
            .while(StoreActions.Updating)
            .throwIf(security)
            .isUndefined(undefinedMessage("security", payload.id, state.index));

        security.accountId = payload.accountId;
        security.securityId = payload.securityId;
        security.shares = payload.shares;

        state.items = [...state.items];
    },
    [MUTATION_REMOVE_ACCOUNT_SECURITY](storeState, payload: PayloadRemoveAccountSecurity) {
        storeState[STATE_ACCOUNTS_SECURITIES].items = storeState[STATE_ACCOUNTS_SECURITIES].items.filter(
            (x) => x.id !== payload.id,
        );
    },
}

export const accountsState = {
    [STATE_ACCOUNTS]: accountState,
    [STATE_ACCOUNTS_DEPOSITS]: depositState,
    [STATE_ACCOUNTS_SECURITIES]: securityState,
}