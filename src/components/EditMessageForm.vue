<template>
  <v-list-item-content>
    <v-list-item-title>
      <v-text-field
        outlined
        dense
        clearable
        v-model="$v.editingMessage.text.$model"
      ></v-text-field>
    </v-list-item-title>
    <v-list-item-subtitle class="d-flex justify-center">
      <v-btn
        @click="updateMessage(message)"
        :dark="!$v.editingMessage.text.$invalid"
        :disabled="$v.editingMessage.text.$invalid"
        color="amber darken-4"
        >Save</v-btn
      >
      <v-btn class="ml-4" @click="cancelEditing" dark color="amber darken-4"
        >Cancel</v-btn
      >
    </v-list-item-subtitle>
  </v-list-item-content>
</template>

<script>
import { messagesRef } from "../configs/firebase";
import { validationMixin } from "vuelidate";
import { required } from "vuelidate/lib/validators";

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
  validations: {
    editingMessage: {
      text: { required }
    }
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
  },
  mixins: [validationMixin]
};
</script>

<style></style>
