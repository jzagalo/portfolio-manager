import { IAccountState, IAccountGetters } from "@/store/account-types";
import { ActionContext, ActionTree, MutationTree, GetterTree } from "vuex";
import { IRouteState } from "./route-types";
import { STATE_ROUTES } from "@/store/store-constants";
import { ISecurityState, ISecurityGetters } from "@/store/security-types";
import { IPortfolioState, IPortfolioGetters } from "@/store/portfolio-types";



export interface IStoreState extends IAccountState, IPortfolioState, ISecurityState {    
    [STATE_ROUTES]: IRouteState;
}

export type ActionFn<T> = (payload: T) => void;
export type StoreActionTree = ActionTree<IStoreState,IStoreState>;
export type StoreContext = ActionContext<IStoreState,IStoreState>;
export type StoreMutationTree = MutationTree<IStoreState>;
export type StoreGetterTree = GetterTree<IStoreState, IStoreState>;

export interface IStoreGetters extends IAccountGetters,IPortfolioGetters,ISecurityGetters {}
