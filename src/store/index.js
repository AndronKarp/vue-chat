import Vue from "vue";
import Vuex from "vuex";
import user from "./modules/user";
import userEmails from "./modules/user-emails";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    user,
    userEmails
  }
});
