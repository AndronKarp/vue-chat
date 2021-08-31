<template>
  <VDialog v-model="isShown" max-width="500">
    <template #activator="{ on, attrs }">
      <VBtn
        fab
        fixed
        bottom
        right
        color="primary"
        dark
        v-bind="attrs"
        v-on="on"
      >
        <VIcon>mdi-plus</VIcon>
      </VBtn>
    </template>
    <VCard>
      <VCardTitle>Create chat</VCardTitle>
      <VForm class="px-2" @submit.prevent="createChat">
        <VCardText class="pt-0">
          <VTextField
            v-model="form.title"
            label="Chat title"
            type="text"
            outlined
            dense
            hide-details
          />
        </VCardText>
        <VCardActions>
          <VSpacer />
          <VBtn
            text
            color="primary"
            :disabled="isSubmitting"
            @click="cancelCreating"
            >Cancel</VBtn
          >
          <VBtn
            text
            color="primary"
            type="submit"
            :disabled="!form.title"
            :loading="isSubmitting"
            >Create</VBtn
          >
        </VCardActions>
      </VForm>
    </VCard>
  </VDialog>
</template>

<script>
import { mapState } from "vuex";

import { chatsRef, usersRef } from "@/firebase";

export default {
  name: "FormCreateChat",

  data() {
    return {
      form: {
        title: ""
      },
      isShown: false,
      isSubmitting: false
    };
  },

  computed: {
    ...mapState("user", { user: "user" })
  },

  methods: {
    cancelCreating() {
      this.form.title = "";
      this.isShown = false;
    },
    async createChat() {
      this.isSubmitting = true;
      const { title } = this.form;
      const { key } = await chatsRef.push({ title, lastMessage: "" });
      await usersRef.child(`${this.user.uid}/chats/${key}`).set(true);
      this.isSubmitting = false;
      this.cancelCreating();
    }
  }
};
</script>
