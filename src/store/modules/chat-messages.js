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
    saveAreMessagesLoadedNewStatus(state, { status }) {
      state.areMessagesLoaded = status;
    },
    removeFromMessages(state, messageIndex) {
      state.messages.splice(messageIndex, 1);
    },
    updateMessageText(state, { message, text }) {
      message.text = text;
    }
  },
  actions: {
    addMessage(store, message) {
      store.commit("addToMessages", message);
    },
    setAreMessagesLoadedStatusToTrue(store) {
      store.commit("saveAreMessagesLoadedNewStatus", { status: true });
    },
    removeMessage(context, messageId) {
      const messageIndex = context.state.messages.findIndex(
        message => message.id === messageId
      );
      context.commit("removeFromMessages", messageIndex);
    },
    editMessage(context, { messageId, text }) {
      const message = context.state.messages.find(
        message => message.id === messageId
      );
      context.commit("updateMessageText", { message, text });
    }
  }
};
