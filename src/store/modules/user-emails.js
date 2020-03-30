export default {
  state: {
    userEmails: []
  },
  getters: {
    isEmailTaken(state) {
      return email => !!state.userEmails.find(user => user.email === email);
    }
  },
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
