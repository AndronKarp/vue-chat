<template>
  <v-dialog v-model="isVisible" max-width="500">
    <template #activator="{ on, attrs }">
      <v-btn
        fab
        color="amber darken-4"
        fixed
        bottom
        right
        v-bind="attrs"
        v-on="on"
      >
        <v-icon color="white">mdi-plus</v-icon>
      </v-btn>
    </template>

    <v-card>
      <v-card-title>Create chat</v-card-title>
      <v-card-text>
        <v-text-field
          v-model="form.title"
          label="Chat title"
          type="text"
          outlined
          dense
        ></v-text-field>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn text @click="finishCreating">Cancel</v-btn>
        <v-btn text :disabled="!form.title" @click="createChat">Create</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapGetters } from "vuex";
import { usersRef, chatsRef } from "../configs/firebase";

export default {
  name: "FormCreateChat",

  data() {
    return {
      form: {
        title: ""
      },
      isVisible: false
    };
  },

  computed: {
    ...mapGetters(["currentUser"])
  },

  methods: {
    async createChat() {
      await this.addChatToDatabase();
      this.finishCreating();
    },
    async addChatToDatabase() {
      const { title } = this.form;
      const { key } = await chatsRef.push({ title, lastMessage: "" });
      await usersRef.child(`${this.currentUser.uid}/chats/${key}`).set(true);
    },
    finishCreating() {
      this.resetForm();
      this.hideForm();
    },
    resetForm() {
      this.form.title = "";
    },
    hideForm() {
      this.isVisible = false;
    }
  }
};
</script>

<style></style>
