import { IAccountState } from "@/store/account-types";
import { ActionContext, ActionTree, MutationTree } from "vuex";
import { IRouteState } from "./route-types";
import { STATE_ACCOUNTS, STATE_ROUTES, } from "@/store/store-constants";
import { ISecurityState } from "@/store/security-types";

export interface IStoreState extends ISecurityState {
    [STATE_ACCOUNTS]: IAccountState;
    [STATE_ROUTES]: IRouteState;
}

export type ActionFn<T> = (payload: T) => void;
export type StoreActionTree = ActionTree<IStoreState,IStoreState>;
export type StoreContext = ActionContext<IStoreState,IStoreState>;
export type StoreMutationTree = MutationTree<IStoreState>;
