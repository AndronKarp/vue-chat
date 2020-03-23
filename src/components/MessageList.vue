<template>
  <v-list
    class="mb-8"
    subheader
    two-line
    elevation="4"
    min-width="280px"
    style="width: 60%"
  >
    <v-subheader>Messages</v-subheader>
    <v-list-item v-for="(message, index) in messages" :key="index">
      <v-row class="px-3" v-if="editingMessage !== message">
        <v-list-item-content>
          <v-list-item-title>{{ message.text }}</v-list-item-title>
          <v-list-item-subtitle>{{ message.name }}</v-list-item-subtitle>
        </v-list-item-content>
        <v-list-item-action class="flex-row">
          <v-icon class="mr-2" dense @click="editMessage(message)"
            >mdi-pencil</v-icon
          >
          <v-icon dense @click="deleteMessage(message)">mdi-delete</v-icon>
        </v-list-item-action>
      </v-row>
      <v-list-item-content v-else>
        <v-list-item-title>
          <v-text-field
            outlined
            dense
            clearable
            v-model="editingMessage.text"
          ></v-text-field>
        </v-list-item-title>
        <v-list-item-subtitle class="d-flex justify-center">
          <v-btn
            @click="updateMessage(message)"
            dark
            color="amber darken-4 mr-4"
            >Save</v-btn
          >
          <v-btn @click="cancelEditing" dark color="amber darken-4"
            >Cancel</v-btn
          >
        </v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>
  </v-list>
</template>

<script>
import { mapGetters } from "vuex";
import { messagesRef } from "../configs/firebase";

export default {
  data() {
    return {
      editingMessage: null
    };
  },
  computed: {
    ...mapGetters(["messages"])
  },
  methods: {
    deleteMessage(message) {
      messagesRef.child(message.id).remove();
    },
    editMessage(message) {
      this.editingMessage = message;
    },
    cancelEditing() {
      this.editingMessage = null;
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
