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

export default {
  name: "PageChatRoom",

  components: {
    FormSendMessage,
    MessageList
  },

  props: {
    id: {
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
    lastMessage() {
      const [lastMessage] = this.messages.slice(-1);
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
      messagesRef.child(this.id).on("child_added", snapshot => {
        this.messages.push({ id: snapshot.key, ...snapshot.val() });
      });
      messagesRef.child(this.id).on("child_changed", snapshot => {
        const updatedMessage = this.messages.find(
          message => message.id === snapshot.key
        );
        updatedMessage.text = snapshot.val().text;
      });
      messagesRef.child(this.id).on("child_removed", ({ key }) => {
        const removedMessageIndex = this.messages.findIndex(
          message => message.id === key
        );
        this.messages.splice(removedMessageIndex, 1);
      });
    },
    async onMessageDelete(messageId) {
      await this.deleteMessageFromDatabase(messageId);
      this.updateChatLastMessage();
    },
    async deleteMessageFromDatabase(messageId) {
      await messagesRef.child(`${this.id}/${messageId}`).remove();
    },
    updateChatLastMessage() {
      chatsRef.child(this.id).update({ lastMessage: this.lastMessage });
    },
    async onMessageSend(message) {
      await this.addMessageToDatabase(message);
      this.updateChatLastMessage();
    },
    async addMessageToDatabase(message) {
      await messagesRef.child(this.id).push(message);
    }
  }
};
</script>

<style></style>
