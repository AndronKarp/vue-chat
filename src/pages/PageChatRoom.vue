<template>
  <v-card class="fill-height d-flex flex-column" tile>
    <MessageList :messages="messages" />
    <FormSendMessage @sendMessage="sendMessage" />
  </v-card>
</template>

<script>
import FormSendMessage from "../components/FormSendMessage";
import MessageList from "../components/MessageList";
import { messagesRef, chatsRef } from "../configs/firebase";
import { mapGetters } from "vuex";

export default {
  props: {
    id: {
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
      return this.chats[this.id];
    }
  },
  methods: {
    fetchMessages() {
      messagesRef.child(this.id).on("value", snapshot => {
        snapshot.forEach(childSnapshot => {
          this.$set(this.messages, childSnapshot.key, childSnapshot.val());
        });
      });
      messagesRef.child(this.id).on("child_removed", snapshot => {
        this.$delete(this.messages, snapshot.key);
      });
    },
    sendMessage(message) {
      this.addMessageToDatabase(message);
      this.updateChatLastMessage(`${message.sender.name}: ${message.text}`);
    },
    addMessageToDatabase(message) {
      messagesRef.child(this.id).push(message);
    },
    updateChatLastMessage(lastMessage) {
      chatsRef.child(this.id).update({ lastMessage });
    }
  },
  created() {
    this.fetchMessages();
  },
  components: {
    FormSendMessage,
    MessageList
  }
};
</script>

<style></style>
