<template>
  <div
    class="d-flex flex-column align-center"
    :class="{ 'justify-center': !messages.length }"
    style="width: 100%; height: 100%"
  >
    <MessageList v-if="messages.length" />
    <span class="mb-2" v-else>No messages yet!</span>
    <SendMessageForm />
  </div>
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
