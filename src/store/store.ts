import Vue from 'vue';
import Vuex from 'vuex';
import { IStoreState } from "@/store/store-types";
import { accountActions, accountsState, accountMutations,
accountGetters } from "@/store/account-module";
import { routeActions,routeState, routeMutations } from "./route-module";
import { securitiesState, securitiesActions, securitiesMutations, securitiesGetters } from "@/store/security-module";

Vue.use(Vuex)

const state: IStoreState = {
   ...accountsState,
  ...routeState,
  ...securitiesState
};

const getters = {
  ...securitiesGetters,
  ...accountGetters,
};

const actions = {
  ...accountActions,
  ...routeActions,
  ...securitiesActions,
}; 

const mutations = {
  ...accountMutations,
  ...routeMutations,
  ...securitiesMutations,
};

export default new Vuex.Store({
  state,
  mutations,
  actions, 
  getters 
});
