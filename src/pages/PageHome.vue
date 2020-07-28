<template>
  <v-container
    class="d-flex flex-column align-center"
    :class="{ 'justify-center': !messages.length }"
    style="height: 100%"
  >
    <MessageList v-if="messages.length" />
    <span class="mb-2" v-else>No messages yet!</span>
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
