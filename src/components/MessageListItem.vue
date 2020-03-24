<template>
  <v-list-item>
    <v-row class="px-3" v-if="!isEditing">
      <v-list-item-content>
        <v-list-item-title>{{ message.text }}</v-list-item-title>
        <v-list-item-subtitle>{{ message.name }}</v-list-item-subtitle>
      </v-list-item-content>
      <v-list-item-action class="flex-row">
        <v-icon class="mr-2" dense @click="editMessage">mdi-pencil</v-icon>
        <v-icon dense @click="deleteMessage(message)">mdi-delete</v-icon>
      </v-list-item-action>
    </v-row>
    <EditMessageForm
      v-else
      :message="message"
      @onCancelEditing="cancelEditing"
    />
  </v-list-item>
</template>

<script>
import { messagesRef } from "../configs/firebase";
import EditMessageForm from "./EditMessageForm";

export default {
  props: {
    message: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      isEditing: false
    };
  },
  methods: {
    deleteMessage(message) {
      messagesRef.child(message.id).remove();
    },
    editMessage() {
      this.isEditing = true;
    },
    cancelEditing() {
      this.isEditing = false;
    }
  },
  components: {
    EditMessageForm
  }
};
</script>

<style></style>
