import { Store } from "vuex";
import {
    ACTION_PUSH_ROUTE, MUTATION_PUSH_ROUTE, 
    ACTION_POP_ROUTE, MUTATION_POP_ROUTE,
} from "./store-constants";

import { IStoreState, StoreActionTree, 
            StoreContext, StoreMutationTree  } from "./store-types";

import { PushRoutePayload } from "./route-types";

export const actions: StoreActionTree = {
    [ACTION_PUSH_ROUTE](this: Store<IStoreState>, {commit}: StoreContext, route: PushRoutePayload){
        commit(MUTATION_PUSH_ROUTE, route);
    },
    [ACTION_POP_ROUTE](this: Store<IStoreState>, { commit }: StoreContext) {
        commit(MUTATION_POP_ROUTE);
    },
}

export const mutations: StoreMutationTree = {
    [MUTATION_PUSH_ROUTE](state: IStoreState, payload: PushRoutePayload){
        state.routes.history = [ payload, ...state.routes.history ];
    },
    [MUTATION_POP_ROUTE](state: IStoreState){
        switch(state.routes.history.length){
            case 0:
                return;
            case 1:
                state.routes.history = [];
                return;
            default:
                state.routes.history = state.routes.history.slice(1);
                return;
        }
    }
}