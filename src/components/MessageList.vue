<template>
  <v-list
    subheader
    two-line
    class="fill-height pt-14 pb-12"
    max-height="100vh"
    style="overflow-y: auto"
  >
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
