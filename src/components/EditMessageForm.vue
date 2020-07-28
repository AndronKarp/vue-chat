<template>
  <v-form
    @submit.prevent="editMessage(message)"
    class="d-flex flex-column align-center py-2"
    style="width: 100%"
  >
    <v-text-field
      outlined
      dense
      clearable
      v-model="$v.editingMessage.text.$model"
      style="width: 100%"
    ></v-text-field>
    <div class="buttons d-flex">
      <v-btn
        type="submit"
        :dark="!$v.editingMessage.text.$invalid"
        :disabled="$v.editingMessage.text.$invalid"
        color="amber darken-4"
        >Save</v-btn
      >
      <v-btn class="ml-4" @click="cancelEditing" dark color="amber darken-4"
        >Cancel</v-btn
      >
    </div>
  </v-form>
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
    async editMessage(message) {
      await messagesRef
        .child(message.id)
        .update({ text: this.editingMessage.text });
      this.cancelEditing();
    }
  },
  mixins: [validationMixin]
};
</script>

<style></style>
