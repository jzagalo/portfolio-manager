import {  Store } from "vuex";
import { ACTION_ADD_ACCOUNT, ACTION_REMOVE_ACCOUNT,
     MUTATION_ADD_ACCOUNT, MUTATION_REMOVE_ACCOUNT, STATE_ACCOUNTS } 
            from "./store-constants";
import { IStoreState } from "./store-types";
import { AccountModel } from "./account-model";
import { initialState } from "@/store/account-initial-state";

import { AddAccountPayload, RemoveAccountPayload, StoreActionTree, 
        StoreContext, StoreMutationTree } from "@/store";


export const accountActions: StoreActionTree = {
    [ACTION_ADD_ACCOUNT](this: Store<IStoreState>, { commit}: StoreContext, name: AddAccountPayload){
        commit(MUTATION_ADD_ACCOUNT, name);
    },
    [ACTION_REMOVE_ACCOUNT](this: Store<IStoreState>, {commit}: StoreContext, id: RemoveAccountPayload){
        commit(MUTATION_REMOVE_ACCOUNT, id);
    }
} 

export const accountMutations: StoreMutationTree = {
    [MUTATION_ADD_ACCOUNT](state: IStoreState, payload: AddAccountPayload){
        const account = new AccountModel({ id: state[STATE_ACCOUNTS].index, name: payload });
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
    }
}

export const accountState = {
    [STATE_ACCOUNTS]: initialState,
}