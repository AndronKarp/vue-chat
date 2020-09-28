<template>
  <v-form
    @submit.prevent="sendMessage"
    style="position: sticky; bottom: 0; width: 100%"
  >
    <v-text-field
      v-model="messageText"
      class="rounded-0"
      type="text"
      placeholder="Write your message..."
      hide-details
      solo
    >
      <template #append>
        <v-btn
          :disabled="isMessageEmpty"
          icon
          small
          type="submit"
          color="primary"
        >
          <v-icon>mdi-send</v-icon>
        </v-btn>
      </template>
    </v-text-field>
  </v-form>
</template>

<script>
import message from "../mixins/message";
import { mapGetters } from "vuex";

export default {
  name: "FormSendMessage",

  mixins: [message],

  computed: {
    ...mapGetters(["currentUser"])
  },

  methods: {
    sendMessage() {
      this.$emit("message-send", {
        text: this.messageText,
        sender: { id: this.currentUser.uid, name: this.currentUser.displayName }
      });
      this.setMessageText("");
    }
  }
};
</script>

<style></style>
