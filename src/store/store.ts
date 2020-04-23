import Vue from 'vue'
import Vuex from 'vuex'
import { initialState as accountState } from "@/store/account-initial-state";
import { IStoreState } from "@/store/store-types";
import { actions as accountActions, mutations as accountMutations } from "@/store/account-module";


Vue.use(Vuex)

const state: IStoreState = {
  accounts: accountState
};

const actions = {
  ...accountActions,
}; 

const mutations = {
  ...accountMutations,
};

export default new Vuex.Store({
  state,
  mutations,
  actions,  
});
