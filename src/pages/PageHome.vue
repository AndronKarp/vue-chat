<template>
  <v-container class="d-flex flex-column align-center" style="height: 100%">
    <MessageList v-if="messages.length" />
    <v-container class="d-flex justify-center" v-else
      >No messages yet!</v-container
    >
    <SendMessageForm />
  </v-container>
</template>

<script>
import { mapGetters } from "vuex";
import MessageList from "../components/MessageList";
import SendMessageForm from "../components/SendMessageForm";

export default {
  computed: {
    ...mapGetters(["messages"])
  },
  components: {
    MessageList,
    SendMessageForm
  }
};
</script>

<style></style>
