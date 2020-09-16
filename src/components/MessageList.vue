<template>
  <v-card class="flex-fill d-flex flex-column">
    <v-spacer></v-spacer>
    <MessageListItem
      v-for="[key, message] in Object.entries(messages)"
      :key="key"
      :message="message"
    />
  </v-card>
</template>

<script>
import MessageListItem from "./MessageListItem";

export default {
  props: {
    messages: {
      type: Object,
      required: true
    }
  },
  components: {
    MessageListItem
  }
};
</script>

<style></style>
