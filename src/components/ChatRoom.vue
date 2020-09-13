<template>
  <v-card class="fill-height" tile style="position: relative">
    <v-toolbar color="amber darken-4" dark absolute height="56px" width="100%">
      <v-toolbar-title>
        <v-list-item class="pa-0">
          <v-list-item-content>
            <v-list-item-title>{{ selectedChat.title }}</v-list-item-title>
            <v-list-item-subtitle>{{
              selectedChat.members.length | appendMembersString
            }}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-toolbar-title>
    </v-toolbar>
    <MessageList :messages="response" />
    <SendMessageForm @sendMessage="sendMessage" />
  </v-card>
</template>

<script>
import SendMessageForm from "../components/SendMessageForm";
import MessageList from "../components/MessageList";
import { database } from "../configs/firebase";
import firestoreMixin from "../mixins/firestore-mixin";

export default {
  props: {
    selectedChat: {
      type: Object,
      required: true
    }
  },
  filters: {
    appendMembersString(value) {
      return value === 1 ? `${value} member` : `${value} members`;
    }
  },
  methods: {
    sendMessage(message) {
      this.addMessageToDatabase(message);
      this.updateChatLastMessage(`${message.sender.name}: ${message.text}`);
    },
    addMessageToDatabase(message) {
      database
        .collection(`chats/${this.selectedChat.id}/messages`)
        .add(message);
    },
    updateChatLastMessage(lastMessage) {
      database.doc(`chats/${this.selectedChat.id}`).update({ lastMessage });
    }
  },
  created() {
    const messagesRef = database.collection(
      `chats/${this.selectedChat.id}/messages`
    );
    this.setSnapshotListener(messagesRef);
  },
  components: {
    SendMessageForm,
    MessageList
  },
  mixins: [firestoreMixin]
};
</script>

<style></style>
