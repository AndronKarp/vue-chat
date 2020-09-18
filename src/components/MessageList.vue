<template>
  <v-card class="flex-fill d-flex flex-column">
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
