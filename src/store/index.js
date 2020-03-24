import Vue from "vue";
import Vuex from "vuex";
import userMessages from "./modules/user-messages";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    userMessages
  }
});
