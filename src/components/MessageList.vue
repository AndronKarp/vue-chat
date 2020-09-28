<template>
  <v-card class="px-4 flex-fill d-flex flex-column align-start" tile>
    <v-spacer></v-spacer>
    <MessageListItem
      v-for="message in messages"
      :key="message.id"
      :message="message"
      @edit-button-click="$emit('editing-start', message)"
      @delete-button-click="$emit('message-delete', message.id)"
    />
  </v-card>
</template>

<script>
import MessageListItem from "./MessageListItem";

export default {
  name: "MessageList",

  components: {
    MessageListItem
  },

  props: {
    messages: {
      type: Array,
      required: true
    }
  }
};
</script>

<style></style>
