<template>
  <v-card
    class="fill-height pt-14 pb-12 d-flex flex-column"
    max-height="100vh"
    style="overflow-y: auto"
  >
    <v-spacer></v-spacer>
    <MessageListItem
      v-for="message in messages"
      :key="message.id"
      :message="message"
    />
  </v-card>
</template>

<script>
import MessageListItem from "./MessageListItem";
import { messagesRef } from "../configs/firebase";

export default {
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
  created() {
    messagesRef.child(this.chatId).on("child_added", snapshot => {
      this.messages.push({ ...snapshot.val(), id: snapshot.key });
    });
  },
  components: {
    MessageListItem
  }
};
</script>

<style></style>
