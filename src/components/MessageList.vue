<template>
  <v-card class="px-4 flex-fill d-flex flex-column align-start">
    <v-spacer></v-spacer>
    <MessageListItem
      v-for="message in messages"
      :key="message.id"
      :message="message"
      @delete-button-click="onDeleteButtonClick(message.id)"
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
  },

  methods: {
    onDeleteButtonClick(messageId) {
      this.$emit("message-delete", messageId);
    }
  }
};
</script>

<style></style>
