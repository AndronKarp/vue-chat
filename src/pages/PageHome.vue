<template>
  <v-container
    class="d-flex flex-column align-center"
    :class="{ 'justify-center': !areMessagesLoaded }"
    style="height: 100%"
  >
    <v-container
      v-if="areMessagesLoaded"
      class="d-flex flex-column align-center"
      :class="{ 'justify-center': !messages.length }"
      style="height: 100%"
    >
      <MessageList v-if="messages.length" />
      <v-container class="d-flex justify-center" v-else
        >No messages yet!</v-container
      >
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
import { mapGetters } from "vuex";
import MessageList from "../components/MessageList";
import SendMessageForm from "../components/SendMessageForm";

export default {
  computed: {
    ...mapGetters(["messages", "areMessagesLoaded"])
  },
  components: {
    MessageList,
    SendMessageForm
  }
};
</script>

<style></style>
