<template>
  <v-form
    @submit.prevent="sendMessage"
    style="position: absolute; bottom: 0; width: 100%"
  >
    <v-text-field
      v-model="text"
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
      this.$emit("sendMessage", {
        text: this.text,
        sender: { id: this.currentUser.uid, name: this.currentUser.displayName }
      });
      this.text = "";
    }
  },
  mixins: [isMessageEmpty]
};
</script>

<style></style>
