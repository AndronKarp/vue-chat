<template>
  <v-hover v-slot:default="{ hover }">
    <v-card tile class="d-flex">
      <v-card-text v-if="isMessageEditing">
        <EditMessageForm :message="message" @onCancelEditing="cancelEditing" />
      </v-card-text>
      <template v-else>
        <v-card-text>
          <div class="text--primary text-body-1">{{ message.text }}</div>
          <div>{{ message.name }}</div>
        </v-card-text>
        <v-card-actions v-if="isCurrentUserSender && hover">
          <v-btn x-small icon @click="startEditing">
            <v-icon>mdi-pencil</v-icon>
          </v-btn>
          <v-btn x-small icon @click="deleteMessage(message)">
            <v-icon>mdi-delete</v-icon>
          </v-btn>
        </v-card-actions>
      </template>
    </v-card>
  </v-hover>
</template>

<script>
import { messagesRef } from "../configs/firebase";
import { mapGetters } from "vuex";
import EditMessageForm from "../components/EditMessageForm";

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
