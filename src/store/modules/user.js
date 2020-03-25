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
    updateUser(state, user) {
      state.currentUser = user;
    }
  },
  actions: {
    authorize(store, user) {
      store.commit("updateUser", user);
    }
  }
};
