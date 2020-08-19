<template>
  <v-form
    @submit.prevent="signIn"
    class="d-flex flex-column align-center align-self-center"
    style="width: 25%; min-width: 280px"
  >
    <v-text-field
      v-model="$v.form.email.$model"
      placeholder="Your e-mail..."
      type="email"
      dense
      outlined
      style="width: 100%"
      :error="authError"
    ></v-text-field>
    <v-text-field
      v-model="$v.form.password.$model"
      placeholder="Your password..."
      type="password"
      dense
      outlined
      style="width: 100%"
      :error-messages="authErrorMessage"
    ></v-text-field>
    <v-btn
      type="submit"
      color="amber darken-4"
      :dark="!$v.form.$invalid"
      :disabled="$v.form.$invalid"
      :loading="isFormSubmitting"
      >Sign In</v-btn
    >
  </v-form>
</template>

<script>
import { validationMixin } from "vuelidate";
import { required } from "vuelidate/lib/validators";
import { mapGetters } from "vuex";
import { auth } from "../configs/firebase";

export default {
  data() {
    return {
      form: {
        email: null,
        password: null
      },
      authError: false,
      isFormSubmitting: false
    };
  },
  validations: {
    form: {
      email: { required },
      password: { required }
    }
  },
  computed: {
    ...mapGetters(["currentUser"]),
    authErrorMessage() {
      return this.authError ? "Invalid e-mail or password" : null;
    }
  },
  methods: {
    signIn() {
      this.authError = false;
      this.isFormSubmitting = true;
      auth
        .signInWithEmailAndPassword(this.form.email, this.form.password)
        .then(() => this.$router.push("/"))
        .catch(() => {
          this.authError = true;
        })
        .finally(() => (this.isFormSubmitting = false));
    }
  },
  mixins: [validationMixin]
};
</script>

<style></style>
