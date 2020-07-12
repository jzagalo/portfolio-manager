import { IAccountState } from "@/store/account-types";
import { ActionContext, ActionTree, MutationTree, GetterTree } from "vuex";
import { IRouteState } from "./route-types";
import { STATE_ROUTES } from "@/store/store-constants";
import { ISecurityState, ISecurityGetters } from "@/store/security-types";


export interface IStoreState extends IAccountState,ISecurityState {    
    [STATE_ROUTES]: IRouteState;
}

export type ActionFn<T> = (payload: T) => void;
export type StoreActionTree = ActionTree<IStoreState,IStoreState>;
export type StoreContext = ActionContext<IStoreState,IStoreState>;
export type StoreMutationTree = MutationTree<IStoreState>;
export type StoreGetterTree = GetterTree<IStoreState, IStoreState>;

export interface IStoreGetters extends ISecurityGetters {

}
