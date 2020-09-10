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

export default {
  props: {
    messages: {
      type: Array,
      required: true
    }
  },
  components: {
    MessageListItem
  }
};
</script>

<style></style>
