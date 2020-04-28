import { Store } from "vuex";
import {
    ACTION_PUSH_ROUTE, MUTATION_PUSH_ROUTE, 
    ACTION_POP_ROUTE, MUTATION_POP_ROUTE,
    STATE_ROUTES,
} from "./store-constants";
import {initialState} from "@/store/route-initial-state";
import { IStoreState, StoreActionTree, 
            StoreContext, StoreMutationTree  } from "./store-types";

import { PushRoutePayload } from "./route-types";

export const routeActions: StoreActionTree = {
    [ACTION_PUSH_ROUTE](this: Store<IStoreState>, {commit}: StoreContext, route: PushRoutePayload){
        commit(MUTATION_PUSH_ROUTE, route);
    },
    [ACTION_POP_ROUTE](this: Store<IStoreState>, { commit }: StoreContext) {
        commit(MUTATION_POP_ROUTE);
    },
}

export const routeMutations: StoreMutationTree = {
    [MUTATION_PUSH_ROUTE](state: IStoreState, payload: PushRoutePayload){
        state[STATE_ROUTES].history = [ payload, ...state[STATE_ROUTES].history ];
    },
    [MUTATION_POP_ROUTE](state: IStoreState){
        switch(state[STATE_ROUTES].history.length){
            case 0:
                return;
            case 1:
                state[STATE_ROUTES].history = [];
                return;
            default:
                state[STATE_ROUTES].history = state[STATE_ROUTES].history.slice(1);
                return;
        }
    }
}

export const routeState = {
    [STATE_ROUTES]: initialState,
};