import Vue from "vue";
import Vuex from "vuex";
import chatMessages from "./modules/chat-messages";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    chatMessages
  }
});
