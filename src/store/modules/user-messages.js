export default {
  state: {
    messages: [],
    areMessagesLoaded: false
  },
  getters: {
    messages(state) {
      return state.messages;
    },
    areMessagesLoaded(state) {
      return state.areMessagesLoaded;
    }
  },
  mutations: {
    addToMessages(state, message) {
      state.messages.push(message);
    },
    saveAreMessagesLoadedNewStatus(state, status) {
      state.areMessagesLoaded = status;
    },
    removeFromMessages(state, index) {
      state.messages.splice(index, 1);
    }
  },
  actions: {
    addMessage(store, message) {
      store.commit("addToMessages", message);
    },
    updateAreMessagesLoadedStatus(store, status) {
      store.commit("saveAreMessagesLoadedNewStatus", status);
    },
    removeMessage(store, index) {
      store.commit("removeFromMessages", index);
    }
  }
};
