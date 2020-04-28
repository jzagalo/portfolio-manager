import Vue from 'vue'
import Vuex from 'vuex'
//import { initialState as accountState } from "@/store/account-initial-state";
import { IStoreState } from "@/store/store-types";
import { accountActions, accountState,accountMutations } from "@/store/account-module";
import { routeActions,routeState, routeMutations } from "./route-module";
import { securitiesState } from "@/store/security-module";

Vue.use(Vuex)

const state: IStoreState = {
   ...accountState,
  ...routeState,
  ...securitiesState
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
