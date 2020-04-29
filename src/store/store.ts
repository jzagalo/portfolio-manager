import Vue from 'vue';
import Vuex from 'vuex';
import { IStoreState } from "@/store/store-types";
import { accountActions, accountState,accountMutations } from "@/store/account-module";
import { routeActions,routeState, routeMutations } from "./route-module";
import { securitiesState, securitiesGetters } from "@/store/security-module";

Vue.use(Vuex)

const state: IStoreState = {
   ...accountState,
  ...routeState,
  ...securitiesState
};

const getters = {
  ...securitiesGetters,
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
  getters 
});
