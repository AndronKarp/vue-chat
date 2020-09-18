<template>
  <v-card class="fill-height d-flex flex-column" tile>
    <MessageList :messages="messages" @message-delete="onMessageDelete" />
    <FormSendMessage @message-send="onMessageSend" />
  </v-card>
</template>

<script>
import FormSendMessage from "../components/FormSendMessage";
import MessageList from "../components/MessageList";
import { messagesRef, chatsRef } from "../configs/firebase";
import { mapGetters } from "vuex";

export default {
  name: "PageChatRoom",

  components: {
    FormSendMessage,
    MessageList
  },

  props: {
    chatId: {
      type: String,
      required: true
    }
  },

  data() {
    return {
      messages: {}
    };
  },

  computed: {
    ...mapGetters(["chats"]),
    chat() {
      return this.chats[this.chatId];
    },
    lastMessage() {
      const lastMessage = Object.values(this.messages).pop();
      return lastMessage
        ? `${lastMessage.sender.name}: ${lastMessage.text}`
        : "";
    }
  },

  created() {
    this.fetchMessages();
  },

  methods: {
    fetchMessages() {
      messagesRef.child(this.chatId).on("value", snapshot => {
        snapshot.forEach(childSnapshot => {
          this.$set(this.messages, childSnapshot.key, childSnapshot.val());
        });
      });
      messagesRef.child(this.chatId).on("child_removed", ({ key }) => {
        this.$delete(this.messages, key);
      });
    },
    async onMessageDelete(messageId) {
      await this.deleteMessageFromDatabase(messageId);
      this.updateChatLastMessage();
    },
    async deleteMessageFromDatabase(messageId) {
      await messagesRef.child(`${this.chatId}/${messageId}`).remove();
    },
    updateChatLastMessage() {
      chatsRef.child(this.chatId).update({ lastMessage: this.lastMessage });
    },
    async onMessageSend(message) {
      await this.addMessageToDatabase(message);
      this.updateChatLastMessage();
    },
    async addMessageToDatabase(message) {
      await messagesRef.child(this.chatId).push(message);
    }
  }
};
</script>

<style></style>
