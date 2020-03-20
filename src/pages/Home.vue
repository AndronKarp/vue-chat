<template>
  <v-container
    class="d-flex flex-column align-center"
    :class="{ 'justify-center': isLoading }"
    style="height: 100%"
  >
    <v-container
      v-if="!isLoading"
      class="py-10 d-flex flex-column align-center"
      :class="{ 'justify-center': !doMessagesExist }"
      style="height: 100%"
    >
      <v-list
        v-if="doMessagesExist"
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
    <v-progress-circular
      v-else
      indeterminate
      color="amber darken-4"
    ></v-progress-circular>
  </v-container>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { messagesRef } from "../configs/firebase";

export default {
  data() {
    return {
      doMessagesExist: false,
      isLoading: true
    };
  },
  methods: {
    ...mapActions(["addMessage"])
  },
  created() {
    messagesRef.on("value", snapshot => {
      if (snapshot.val()) {
        messagesRef.on("child_added", message => {
          this.doMessagesExist = true;
          this.addMessage({ ...message.val(), id: message.key });
        });
      }
      this.isLoading = false;
    });
  },
  computed: {
    ...mapGetters(["messages"])
  }
};
</script>

<style></style>
