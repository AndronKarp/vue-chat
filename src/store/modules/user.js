export default {
  state: {
    currentUser: null
  },
  getters: {
    currentUser(state) {
      return state.currentUser;
    }
  },
  mutations: {
    updateCurrentUser(state, user) {
      state.currentUser = user;
    }
  },
  actions: {
    authorize(store, user) {
      store.commit("updateCurrentUser", user);
    }
  }
};
