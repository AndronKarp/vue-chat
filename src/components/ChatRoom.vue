<template>
  <v-card class="fill-height" tile style="position: relative">
    <v-toolbar color="amber darken-4" dark absolute height="56px" width="100%">
      <v-toolbar-title>
        <v-list-item class="pa-0">
          <v-list-item-content>
            <v-list-item-title>{{ selectedChat.title }}</v-list-item-title>
            <v-list-item-subtitle
              >{{ numberOfMembers }} members</v-list-item-subtitle
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
import { messagesRef, chatsRef } from "../configs/firebase";
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
    ...mapGetters(["currentUser"]),
    numberOfMembers() {
      return Object.keys(this.selectedChat.members).length;
    }
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
    sendMessage(message) {
      this.saveMessageToDatabase(message);
      this.updateChatLastMessage({
        lastMessage: `${this.currentUser.displayName}: ${message.text}`
      });
    },
    saveMessageToDatabase(message) {
      messagesRef.child(this.selectedChat.id).push(message);
    },
    updateChatLastMessage(value) {
      chatsRef.child(this.selectedChat.id).update(value);
    }
  },
  components: {
    SendMessageForm,
    MessageList
  }
};
</script>

<style></style>
