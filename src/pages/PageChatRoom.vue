<template>
  <v-card class="fill-height d-flex flex-column" tile>
    <MessageList
      :messages="messages"
      @editing-start="onEditingStart"
      @message-remove="removeMessageFromDatabase"
    />
    <FormEditMessage
      v-if="editableMessage"
      :message="editableMessage"
      @editing-cancel="onEditingCancel"
      @editing-confirm="updateMessageText"
    />
    <FormSendMessage v-else @message-send="addMessageToDatabase" />
  </v-card>
</template>

<script>
import FormSendMessage from "../components/FormSendMessage";
import MessageList from "../components/MessageList";
import { messagesRef, chatsRef } from "../configs/firebase";
import FormEditMessage from "../components/FormEditMessage";

export default {
  name: "PageChatRoom",

  components: {
    FormSendMessage,
    MessageList,
    FormEditMessage
  },

  props: {
    id: {
      type: String,
      required: true
    }
  },

  data() {
    return {
      messages: [],
      editableMessage: null
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

  watch: {
    lastMessage: "updateChatLastMessage"
  },

  created() {
    this.fetchMessages();
  },

  methods: {
    updateChatLastMessage(value) {
      chatsRef.child(this.id).update({ lastMessage: value });
    },
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
    onEditingStart(message) {
      this.editableMessage = message;
    },
    onEditingCancel() {
      this.editableMessage = null;
    },
    removeMessageFromDatabase(messageId) {
      messagesRef.child(`${this.id}/${messageId}`).remove();
    },
    updateMessageText({ messageId, text }) {
      messagesRef.child(`${this.id}/${messageId}`).update({ text });
      this.onEditingCancel();
    },
    addMessageToDatabase(message) {
      messagesRef.child(this.id).push(message);
    }
  }
};
</script>

<style></style>
