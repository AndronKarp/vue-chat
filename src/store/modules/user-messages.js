export default {
  state: {
    messages: []
  },
  getters: {
    messages(state) {
      return state.messages;
    }
  },
  mutations: {
    addToMessages(state, message) {
      state.messages.push(message);
    }
  },
  actions: {
    addMessage(store, message) {
      store.commit("addToMessages", message);
    }
  }
};
