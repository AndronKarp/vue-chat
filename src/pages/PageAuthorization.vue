<template>
  <v-form @submit.prevent="signIn" class="text-center">
    <v-text-field
      v-model="$v.form.email.$model"
      label="E-mail"
      type="email"
      :error="authError"
      outlined
      dense
    ></v-text-field>
    <v-text-field
      v-model="$v.form.password.$model"
      label="Password"
      type="password"
      :error-messages="authErrorMessage"
      outlined
      dense
    ></v-text-field>
    <p>
      Don't have an account?
      <router-link to="/reg">Create it now!</router-link>
    </p>
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
import { auth } from "../configs/firebase";

export default {
  name: "PageAuthorization",

  mixins: [validationMixin],

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
  }
};
</script>

<style></style>
