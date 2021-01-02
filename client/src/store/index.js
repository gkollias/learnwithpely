import Vue from 'vue';
import 'es6-promise/auto';
import Vuex from 'vuex';
import actions from './actions';
import getters from './getters';
import mutations from './mutations';
import state from './state';

Vue.use(Vuex);

export default new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  state,
  actions,
  getters,
  mutations,
});
