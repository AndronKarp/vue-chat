<template>
  <v-container
    class="py-10 d-flex flex-column align-center"
    :class="{ 'justify-center': !messages.length }"
    style="height: 100%"
  >
    <v-list
      v-if="messages.length"
      two-line
      disabled
      elevation="4"
      min-width="280px"
      style="width: 60%"
    >
      <v-list-item v-for="(message, index) in messages" :key="index">
        <v-list-item-content>
          <v-list-item-title>{{ message.name }}</v-list-item-title>
          <v-list-item-subtitle>{{ message.text }}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </v-list>
    <div v-else>No messages yet!</div>
  </v-container>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { messagesRef } from "../configs/firebase";

export default {
  methods: {
    ...mapActions(["addMessage"])
  },
  created() {
    messagesRef.on("child_added", snapshot =>
      this.addMessage({ ...snapshot.val(), id: snapshot.key })
    );
  },
  computed: {
    ...mapGetters(["messages"])
  }
};
</script>

<style></style>
