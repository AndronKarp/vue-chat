import { chatsRef, usersRef } from "@/firebase";

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
    pushToChats(state, chat) {
      state.chats.push(chat);
    },
    setChatProperty(state, { chatId, property }) {
      const chat = state.chats.find(chat => chat.id === chatId);
      chat[property.key] = property.value;
    },
    removeChat(state, id) {
      const chatIndex = state.chats.findIndex(chat => chat.id === id);
      state.chats.splice(chatIndex, 1);
    },
    unsetChats(state) {
      state.chats = [];
    }
  },
  actions: {
    fetchChats({ rootState, commit }) {
      usersRef
        .child(`${rootState.user.currentUser.uid}/chats`)
        .on("child_added", ({ key }) => {
          chatsRef.child(key).once("value", snapshot => {
            commit("pushToChats", { id: key, ...snapshot.val() });
          });
          chatsRef.child(key).on("child_changed", snapshot => {
            commit("setChatProperty", {
              chatId: key,
              property: { key: snapshot.key, value: snapshot.val() }
            });
          });
        });
      usersRef
        .child(`${rootState.user.currentUser.uid}/chats`)
        .on("child_removed", ({ key }) => {
          chatsRef.child(key).off();
          commit("removeChat", key);
        });
    },
    clearChats({ commit }) {
      chatsRef.once("value", snapshot => {
        snapshot.forEach(({ ref }) => ref.off());
        commit("unsetChats");
      });
    }
  }
};
