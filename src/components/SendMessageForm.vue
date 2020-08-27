<template>
  <v-form @submit.prevent="sendMessage">
    <v-text-field
      v-model="text"
      type="text"
      placeholder="Write your message..."
      hide-details
      outlined
      dense
    >
      <template #append>
        <v-btn
          :disabled="isMessageEmpty"
          icon
          small
          type="submit"
          style="top: -2px"
          color="primary"
        >
          <v-icon>mdi-send</v-icon>
        </v-btn>
      </template>
    </v-text-field>
  </v-form>
</template>

<script>
import { messagesRef } from "../configs/firebase";
import { mapGetters } from "vuex";
import isMessageEmpty from "../mixins/is-message-empty";

export default {
  data() {
    return {
      text: ""
    };
  },
  computed: {
    ...mapGetters(["currentUser"])
  },
  methods: {
    sendMessage() {
      messagesRef.push({
        name: this.currentUser.displayName,
        text: this.text,
        senderId: this.currentUser.uid
      });
      this.text = "";
    }
  },
  mixins: [isMessageEmpty]
};
</script>

<style></style>
