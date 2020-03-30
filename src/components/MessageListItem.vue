<template>
  <v-hover v-slot:default="{ hover }">
    <v-list-item>
      <v-row class="px-3" v-if="!isEditing">
        <v-list-item-content>
          <v-list-item-title>{{ message.text }}</v-list-item-title>
          <v-list-item-subtitle>{{ message.name }}</v-list-item-subtitle>
        </v-list-item-content>
        <v-list-item-action
          :hidden="!hover || !isCurrentUserSender"
          class="flex-row align-center"
        >
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
  </v-hover>
</template>

<script>
import { messagesRef } from "../configs/firebase";
import EditMessageForm from "./EditMessageForm";
import { mapGetters } from "vuex";

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
  computed: {
    ...mapGetters(["currentUser"]),
    isCurrentUserSender() {
      return this.currentUser
        ? this.currentUser.email === this.message.sender
        : false;
    }
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
