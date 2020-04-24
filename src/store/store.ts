import Vue from 'vue'
import Vuex from 'vuex'
import { initialState as accountState } from "@/store/account-initial-state";
import { IStoreState } from "@/store/store-types";
import { actions as accountActions, 
          mutations as accountMutations } from "@/store/account-module";
import { initialState as routeState } from "./route-initial-state";
import { actions as routeActions, mutations as routeMutations } from "./route-module";


Vue.use(Vuex)

const state: IStoreState = {
  accounts: accountState,
  routes: routeState,
};

const actions = {
  ...accountActions,
  ...routeActions,
}; 

const mutations = {
  ...accountMutations,
  ...routeMutations,
};

export default new Vuex.Store({
  state,
  mutations,
  actions,  
});
