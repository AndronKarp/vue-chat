export default {
  namespaced: true,
  state: {
    user: null
  },
  mutations: {
    setUser(state, v) {
      state.user = v;
    }
  },
  actions: {
    authorize(store, user) {
      store.commit("setUser", user);
    }
  }
};
