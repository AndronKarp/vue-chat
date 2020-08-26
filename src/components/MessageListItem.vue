<template>
  <v-hover v-slot:default="{ hover }">
    <v-list-item>
      <EditMessageForm
        v-if="isMessageEditing"
        :message="message"
        @onCancelEditing="cancelEditing"
      />
      <template v-else>
        <v-list-item-content>
          <v-list-item-title>{{ message.text }}</v-list-item-title>
          <v-list-item-subtitle>{{ message.name }}</v-list-item-subtitle>
        </v-list-item-content>
        <v-list-item-action
          class="flex-row align-center"
          :class="{ 'd-none': !hover || !isCurrentUserSender }"
        >
          <v-btn x-small icon @click="startEditing">
            <v-icon>mdi-pencil</v-icon>
          </v-btn>
          <v-btn x-small icon @click="deleteMessage(message)">
            <v-icon>mdi-delete</v-icon>
          </v-btn>
        </v-list-item-action>
      </template>
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
      isMessageEditing: false
    };
  },
  computed: {
    ...mapGetters(["currentUser"]),
    isCurrentUserSender() {
      return this.currentUser
        ? this.currentUser.uid === this.message.senderId
        : false;
    }
  },
  methods: {
    deleteMessage(message) {
      messagesRef.child(message.id).remove();
    },
    startEditing() {
      this.isMessageEditing = true;
    },
    cancelEditing() {
      this.isMessageEditing = false;
    }
  },
  components: {
    EditMessageForm
  }
};
</script>

<style></style>
