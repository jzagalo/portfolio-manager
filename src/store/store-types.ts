import { IAccountState } from "@/store/account-types";
import { ActionContext, ActionTree, MutationTree } from "vuex";
import { IRouteState } from "./route-types";

export interface IStoreState {
    accounts: IAccountState;
    routes: IRouteState;
}

export type ActionFn<T> = (payload: T) => void;
export type StoreActionTree = ActionTree<IStoreState,IStoreState>;
export type StoreContext = ActionContext<IStoreState,IStoreState>;
export type StoreMutationTree = MutationTree<IStoreState>;
