export default {
  state: {
    userEmails: []
  },
  getters: {},
  mutations: {
    addToUserEmails(state, userEmail) {
      state.userEmails.push(userEmail);
    }
  },
  actions: {
    addUserEmail(store, userEmail) {
      store.commit("addToUserEmails", userEmail);
    }
  }
};
