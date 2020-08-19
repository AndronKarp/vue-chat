<template>
  <v-list class="mb-8" subheader two-line elevation="4">
    <v-subheader>Messages</v-subheader>
    <MessageListItem
      v-for="(message, index) in messages"
      :key="index"
      :message="message"
    />
  </v-list>
</template>

<script>
import { mapGetters } from "vuex";
import MessageListItem from "./MessageListItem";

export default {
  computed: {
    ...mapGetters(["messages"])
  },
  components: {
    MessageListItem
  }
};
</script>

<style></style>
