<template>
  <v-card tile class="d-flex">
    <v-card-text>
      <div class="text--primary text-body-1">{{ message.text }}</div>
      <div>{{ message.sender.name }}</div>
    </v-card-text>
    <v-card-actions v-if="isCurrentUserSender">
      <v-btn icon @click="deleteMessage">
        <v-icon>mdi-delete</v-icon>
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "MessageListItem",

  props: {
    message: {
      type: Object,
      required: true
    }
  },

  computed: {
    ...mapGetters(["currentUser"]),
    isCurrentUserSender() {
      return this.currentUser.uid === this.message.sender.id;
    }
  },

  methods: {
    deleteMessage() {
      this.$emit("delete-button-click");
    }
  }
};
</script>

<style></style>
