<template>
  <v-list-item-content>
    <v-list-item-title>
      <v-text-field
        outlined
        dense
        clearable
        v-model="editingMessage.text"
      ></v-text-field>
    </v-list-item-title>
    <v-list-item-subtitle class="d-flex justify-center">
      <v-btn @click="updateMessage(message)" dark color="amber darken-4 mr-4"
        >Save</v-btn
      >
      <v-btn @click="cancelEditing" dark color="amber darken-4">Cancel</v-btn>
    </v-list-item-subtitle>
  </v-list-item-content>
</template>

<script>
import { messagesRef } from "../configs/firebase";

export default {
  props: {
    message: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      editingMessage: { ...this.message }
    };
  },
  methods: {
    cancelEditing() {
      this.$emit("onCancelEditing");
    },
    updateMessage(message) {
      messagesRef
        .child(message.id)
        .update({ text: this.editingMessage.text })
        .then(() => this.cancelEditing());
    }
  }
};
</script>

<style></style>
