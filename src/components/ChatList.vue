<template>
  <v-card class="fill-height" tile style="position: relative">
    <v-toolbar color="amber darken-4" dark absolute height="56px" width="100%">
      <v-app-bar-nav-icon @click="toggleNav"></v-app-bar-nav-icon>
    </v-toolbar>
    <v-list class="pt-14" two-line max-height="100vh" style="overflow-y: auto">
      <template v-for="(chat, index) in chats">
        <v-list-item :key="chat.id" @click="selectChat(chat)">
          <v-list-item-avatar color="amber darken-4">
            <v-icon color="white">mdi-chat</v-icon>
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title>{{ chat.title }}</v-list-item-title>
            <v-list-item-subtitle>
              {{ chat.lastMessage }}
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
        <v-divider :key="index"></v-divider>
      </template>
    </v-list>
  </v-card>
</template>

<script>
import { mapGetters } from "vuex";
import { chatsRef } from "../configs/firebase";

export default {
  data() {
    return {
      chats: []
    };
  },
  computed: {
    ...mapGetters(["currentUser"])
  },
  methods: {
    toggleNav() {
      this.$emit("navButtonClick");
    },
    selectChat(chat) {
      this.$emit("chatSelect", chat);
    }
  },
  created() {
    chatsRef
      .orderByChild(`members/${this.currentUser.uid}`)
      .equalTo(true)
      .on("child_added", snapshot => {
        this.chats.push({ ...snapshot.val(), id: snapshot.key });
      });
    chatsRef
      .orderByChild(`members/${this.currentUser.uid}`)
      .equalTo(true)
      .on("child_changed", snapshot => {
        const chat = this.chats.find(chat => chat.id === snapshot.key);
        chat.lastMessage = snapshot.val().lastMessage;
      });
  }
};
</script>

<style></style>
