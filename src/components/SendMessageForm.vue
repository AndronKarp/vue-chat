<template>
  <div
    class="d-flex flex-column align-center"
    style="width: 60%; min-width: 280px;"
  >
    <v-text-field
      v-model="$v.form.text.$model"
      type="text"
      placeholder="Write your message..."
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
  </div>
</template>

<script>
import { validationMixin } from "vuelidate";
import { required } from "vuelidate/lib/validators";
import { messagesRef } from "../configs/firebase";
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      form: {
        text: null
      }
    };
  },
  validations: {
    form: {
      text: { required }
    }
  },
  computed: {
    ...mapGetters(["currentUser"])
  },
  methods: {
    sendMessage() {
      this.$v.form.$touch();
      messagesRef.push({
        name: this.currentUser.displayName,
        text: this.form.text
      });
      this.form.text = null;
    }
  },
  mixins: [validationMixin]
};
</script>

<style></style>
