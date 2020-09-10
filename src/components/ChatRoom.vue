<template>
  <v-card class="fill-height" tile style="position: relative">
    <v-toolbar color="amber darken-4" dark absolute height="56px" width="100%">
      <v-toolbar-title>{{ selectedChat.title }}</v-toolbar-title>
    </v-toolbar>
    <MessageList :messages="messages" />
    <SendMessageForm @sendMessage="saveMessage" />
  </v-card>
</template>

<script>
import SendMessageForm from "../components/SendMessageForm";
import MessageList from "../components/MessageList";
import { messagesRef } from "../configs/firebase";

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
  created() {
    this.fetchMessages();
  },
  methods: {
    fetchMessages() {
      messagesRef.child(this.selectedChat.id).on("child_added", snapshot => {
        this.messages.push({ ...snapshot.val(), id: snapshot.key });
      });
    },
    saveMessage(message) {
      messagesRef.child(this.selectedChat.id).push(message);
    }
  },
  components: {
    SendMessageForm,
    MessageList
  }
};
</script>

<style></style>
