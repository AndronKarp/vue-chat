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
import { mapActions, mapGetters } from "vuex";
import firebaseEventsSetting from "../mixins/firebaseEventsSetting";

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
  computed: {
    ...mapGetters(["doMessagesExist"])
  },
  methods: {
    ...mapActions(["changeDoMessagesExistStatus"]),
    sendMessage() {
      messagesRef.push({ name: this.form.name, text: this.form.text });
      this.form.text = null;
      if (!this.doMessagesExist) {
        this.setFirebaseEvents(messagesRef);
        this.changeDoMessagesExistStatus(true);
      }
    }
  },
  mixins: [validationMixin, firebaseEventsSetting]
};
</script>

<style></style>
