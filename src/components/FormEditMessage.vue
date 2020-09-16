<template>
  <v-form @submit.prevent="editMessage(message)" class="flex-grow-1">
    <v-text-field v-model="text" outlined dense hide-details>
      <template #append-outer>
        <v-btn icon small :disabled="isMessageEmpty" type="submit">
          <v-icon>mdi-check</v-icon>
        </v-btn>
        <v-btn icon small @click="cancelEditing">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </template>
    </v-text-field>
  </v-form>
</template>

<script>
import isMessageEmpty from "../mixins/is-message-empty";
import { messagesRef } from "../configs/firebase";

export default {
  name: "FormEditMessage",

  mixins: [isMessageEmpty],

  props: {
    message: {
      type: Object,
      required: true
    }
  },

  data() {
    return {
      text: this.message.text
    };
  },

  methods: {
    async editMessage(message) {
      await messagesRef.child(message.id).update({ text: this.text });
      this.cancelEditing();
    },
    cancelEditing() {
      this.$emit("onCancelEditing");
    }
  }
};
</script>

<style></style>
