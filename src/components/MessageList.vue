<template>
  <v-card
    class="fill-height pt-14 pb-12 d-flex flex-column"
    max-height="100vh"
    style="overflow-y: auto"
  >
    <v-spacer></v-spacer>
    <MessageListItem
      v-for="(message, index) in messages"
      :key="index"
      :message="message"
    />
  </v-card>
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
