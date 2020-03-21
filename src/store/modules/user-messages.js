export default {
  state: {
    messages: [],
    doMessagesExist: false
  },
  getters: {
    messages(state) {
      return state.messages;
    },
    doMessagesExist(state) {
      return state.doMessagesExist;
    }
  },
  mutations: {
    addToMessages(state, message) {
      state.messages.push(message);
    },
    saveDoMessagesExistNewStatus(state, status) {
      state.doMessagesExist = status;
    }
  },
  actions: {
    addMessage(store, message) {
      store.commit("addToMessages", message);
    },
    changeDoMessagesExistStatus(store, status) {
      store.commit("saveDoMessagesExistNewStatus", status);
    }
  }
};
