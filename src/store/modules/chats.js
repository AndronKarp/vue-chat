import Vue from "vue";
import { chatsRef, usersRef } from "@/configs/firebase";

export default {
  state: {
    chats: {}
  },
  getters: {
    chats(state) {
      return state.chats;
    }
  },
  mutations: {
    setChat(state, { id, value }) {
      Vue.set(state.chats, id, value);
    },
    deleteChat(state, id) {
      Vue.delete(state.chats, id);
    },
    unsetChats(state) {
      state.chats = {};
    }
  },
  actions: {
    fetchChats({ rootState, commit }) {
      usersRef
        .child(`${rootState.user.currentUser.uid}/chats`)
        .on("child_added", ({ key }) => {
          chatsRef.child(key).on("value", snapshot => {
            commit("setChat", { id: key, value: snapshot.val() });
          });
        });
      usersRef
        .child(`${rootState.user.currentUser.uid}/chats`)
        .on("child_removed", ({ key }) => {
          chatsRef.child(key).off();
          commit("deleteChat", key);
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
