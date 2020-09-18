<template>
  <v-card class="fill-height d-flex flex-column" tile>
    <MessageList :messages="messages" @message-delete="onMessageDelete" />
    <FormSendMessage @sendMessage="sendMessage" />
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
      messages: []
    };
  },

  computed: {
    ...mapGetters(["chats"]),
    chat() {
      return this.chats[this.chatId];
    },
    lastMessage() {
      const lastMessage = this.messages[this.messages.length - 1];
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
      messagesRef.child(this.chatId).on("child_added", snapshot => {
        this.messages.push({ id: snapshot.key, ...snapshot.val() });
      });
      messagesRef.child(this.chatId).on("child_changed", snapshot => {
        const updatedMessage = this.messages.find(
          message => message.id === snapshot.key
        );
        updatedMessage.text = snapshot.val().text;
      });
      messagesRef.child(this.chatId).on("child_removed", snapshot => {
        const deletedMessageIndex = this.messages.findIndex(
          message => message.id === snapshot.key
        );
        this.messages.splice(deletedMessageIndex, 1);
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
    async sendMessage(message) {
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
