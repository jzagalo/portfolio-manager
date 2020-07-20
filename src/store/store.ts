import Vue from 'vue';
import Vuex from 'vuex';
import { IStoreState } from "@/store/store-types";
import { accountActions, accountsState, accountMutations,
accountGetters } from "@/store/account-module";
import { routeActions,routeState, routeMutations } from "./route-module";
import { securitiesState, securitiesActions, securitiesMutations, securitiesGetters } from "@/store/security-module";
import { portfolioState, portfolioGetters, } from "@/store/portfolio-module";


Vue.use(Vuex)

const state: IStoreState = {
  ...accountsState,
  ...routeState,
  ...securitiesState,
  ...portfolioState
};

const getters = {
  ...securitiesGetters,
  ...accountGetters,
  ...portfolioGetters,
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
