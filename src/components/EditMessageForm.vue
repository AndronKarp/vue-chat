<template>
  <v-form @submit.prevent="editMessage(message)" class="flex-grow-1">
    <v-text-field outlined dense v-model="text">
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
      text: this.message.text
    };
  },
  computed: {
    isMessageEmpty() {
      return this.text.length === 0;
    }
  },
  methods: {
    cancelEditing() {
      this.$emit("onCancelEditing");
    },
    async editMessage(message) {
      await messagesRef.child(message.id).update({ text: this.text });
      this.cancelEditing();
    }
  }
};
</script>

<style></style>
