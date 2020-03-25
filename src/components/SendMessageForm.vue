<template>
  <v-form
    class="d-flex flex-column align-center"
    style="width: 60%; min-width: 280px;"
  >
    <v-text-field
      v-model="$v.form.text.$model"
      placeholder="Write your message..."
      outlined
      dense
      style="width: 100%"
    ></v-text-field>
    <v-text-field
      v-model="$v.form.name.$model"
      placeholder="Your name..."
      outlined
      dense
      style="width: 100%"
    ></v-text-field>
    <v-btn
      @click="sendMessage"
      color="amber darken-4"
      :dark="!$v.form.$invalid"
      :disabled="$v.form.$invalid"
      >Send</v-btn
    >
  </v-form>
</template>

<script>
import { validationMixin } from "vuelidate";
import { required } from "vuelidate/lib/validators";
import { messagesRef } from "../configs/firebase";

export default {
  data() {
    return {
      form: {
        name: null,
        text: null
      }
    };
  },
  validations: {
    form: {
      name: { required },
      text: { required }
    }
  },
  methods: {
    sendMessage() {
      messagesRef.push({ name: this.form.name, text: this.form.text });
      this.form.text = null;
    }
  },
  mixins: [validationMixin]
};
</script>

<style></style>
