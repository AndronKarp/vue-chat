<template>
  <v-container
    class="d-flex flex-column align-center"
    :class="{ 'justify-center': isLoading }"
    style="height: 100%"
  >
    <v-container
      v-if="!isLoading"
      class="d-flex flex-column align-center"
      :class="{ 'justify-center': !doMessagesExist }"
      style="height: 100%"
    >
      <MessageList v-if="doMessagesExist" />
      <div v-else>No messages yet!</div>
      <SendMessageForm />
    </v-container>
    <v-progress-circular
      v-else
      indeterminate
      color="amber darken-4"
    ></v-progress-circular>
  </v-container>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { messagesRef } from "../configs/firebase";
import MessageList from "../components/MessageList";
import SendMessageForm from "../components/SendMessageForm";

export default {
  data() {
    return {
      isLoading: true
    };
  },
  methods: {
    ...mapActions(["addMessage", "changeDoMessagesExistStatus"])
  },
  computed: {
    ...mapGetters(["doMessagesExist"])
  },
  created() {
    messagesRef.once("value", snapshot => {
      this.changeDoMessagesExistStatus(snapshot.val() != null);
      if (this.doMessagesExist) {
        messagesRef.on("child_added", message => {
          this.addMessage(message.val());
        });
      }
      this.isLoading = false;
    });
  },
  components: {
    MessageList,
    SendMessageForm
  }
};
</script>

<style></style>
