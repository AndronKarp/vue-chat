<template>
  <v-card class="fill-height" tile style="position: relative">
    <v-toolbar color="amber darken-4" dark absolute height="56px" width="100%">
      <v-toolbar-title>
        <v-list-item class="pa-0">
          <v-list-item-content>
            <v-list-item-title>{{ selectedChat.title }}</v-list-item-title>
            <v-list-item-subtitle
              >{{ selectedChat.members.length }} members</v-list-item-subtitle
            >
          </v-list-item-content>
        </v-list-item>
      </v-toolbar-title>
    </v-toolbar>
    <MessageList :messages="messages" />
    <SendMessageForm @sendMessage="sendMessage" />
  </v-card>
</template>

<script>
import SendMessageForm from "../components/SendMessageForm";
import MessageList from "../components/MessageList";
import { chatsRef } from "../configs/firebase";
import { mapGetters } from "vuex";

export default {
  props: {
    selectedChat: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      messages: []
    };
  },
  computed: {
    ...mapGetters(["currentUser"])
  },
  created() {
    this.fetchMessages();
  },
  methods: {
    fetchMessages() {
      chatsRef
        .doc(this.selectedChat.id)
        .collection("messages")
        .onSnapshot(snapshot => {
          const arr = [];
          snapshot.forEach(childSnapshot => {
            arr.push({ id: childSnapshot.id, ...childSnapshot.data() });
          });
          this.messages = arr;
        });
    },
    sendMessage(message) {
      this.saveMessageToDatabase(message);
      this.updateChatLastMessage({
        lastMessage: `${this.currentUser.displayName}: ${message.text}`
      });
    },
    saveMessageToDatabase(message) {
      chatsRef
        .doc(this.selectedChat.id)
        .collection("messages")
        .add(message);
    },
    updateChatLastMessage(value) {
      chatsRef.doc(this.selectedChat.id).update(value);
    }
  },
  components: {
    SendMessageForm,
    MessageList
  }
};
</script>

<style></style>
