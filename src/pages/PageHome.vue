<template>
  <v-row class="fill-height" justify="center">
    <v-col cols="10">
      <MessageList v-if="messages.length" />
      <span class="mb-2" v-else>No messages yet!</span>
      <SendMessageForm />
    </v-col>
  </v-row>
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
