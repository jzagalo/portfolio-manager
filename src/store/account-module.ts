import { ActionContext, ActionTree, MutationTree, Store } from "vuex";
import { ACTION_ADD_ACCOUNT, ACTION_REMOVE_ACCOUNT,
     MUTATION_ADD_ACCOUNT, MUTATION_REMOVE_ACCOUNT } 
            from "./store-constants";
import { IStoreState } from "./store-types";
import { AccountModel } from "./account-model";

import { AddAccountPayload, RemoveAccountPayload } from "./account-types";

type AccountContext = ActionContext<IStoreState, IStoreState>;

export const actions: ActionTree<IStoreState,IStoreState> = {
    [ACTION_ADD_ACCOUNT](this: Store<IStoreState>, { commit}: AccountContext, name: AddAccountPayload){
        commit(MUTATION_ADD_ACCOUNT, name);
    },
    [ACTION_REMOVE_ACCOUNT](this: Store<IStoreState>, {commit}: AccountContext, id: RemoveAccountPayload){
        commit(MUTATION_REMOVE_ACCOUNT, id);
    }
} 

export const mutations: MutationTree<IStoreState> = {
    [MUTATION_ADD_ACCOUNT](state: IStoreState, payload: AddAccountPayload){
        const account = new AccountModel({ id: state.accounts.index, name: payload });
        state.accounts.items = [...state.accounts.items, account].sort((a,b) =>{
            const aName = a.name.toUpperCase();
            const bName = b.name.toUpperCase();
            if(aName < bName){ return -1; }
            if(aName > bName){ return 1;  }
            return 0;
        });
        state.accounts.index += 1;
    },
    [MUTATION_REMOVE_ACCOUNT](state: IStoreState, payload: RemoveAccountPayload){
        state.accounts.items = state.accounts.items.filter((x) => x.id !== payload);
    }
}