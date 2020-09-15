import { database } from "@/configs/firebase";

export default {
  state: {
    chats: []
  },
  getters: {
    chats(state) {
      return state.chats;
    }
  },
  mutations: {
    setChats(state, value) {
      state.chats = value;
    }
  },
  actions: {
    fetchChats({ rootState, commit }) {
      database
        .collection("chats")
        .where("members", "array-contains", rootState.user.currentUser.uid)
        .onSnapshot(({ docs }) => {
          const chats = docs.map(doc => ({ id: doc.id, ...doc.data() }));
          commit("setChats", chats);
        });
    }
  }
};
