<template>
  <v-card class="elevation-12">
    <v-toolbar dark flat color="amber darken-4">
      <v-toolbar-title>Sign into your account</v-toolbar-title>
    </v-toolbar>
    <v-card-text>
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
    </v-card-text>
  </v-card>
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
