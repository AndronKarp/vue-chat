<template>
  <v-card class="flex-fill d-flex flex-column">
    <v-spacer></v-spacer>
    <MessageListItem
      v-for="[id, message] in Object.entries(messages)"
      :key="id"
      :message="message"
      @delete-button-click="onDeleteButtonClick(id)"
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
      type: Object,
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
