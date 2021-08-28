<template>
  <VForm @submit.prevent="signIn" class="d-flex flex-column">
    <VTextField
      v-model="$v.form.email.$model"
      label="E-mail"
      type="email"
      :error="isError"
      outlined
      dense
    />
    <VTextField
      v-model="$v.form.password.$model"
      label="Password"
      type="password"
      :error-messages="errorMessage"
      outlined
      dense
    />
    <span class="mb-4 align-self-center">
      Don't have an account?
      <RouterLink :to="{ name: 'PageRegistration' }">Create it now!</RouterLink>
    </span>
    <VBtn
      type="submit"
      color="amber darken-4"
      :dark="!$v.$invalid"
      :disabled="$v.$invalid"
      :loading="isSubmitting"
      class="align-self-center"
      >Sign In</VBtn
    >
  </VForm>
</template>

<script>
import { validationMixin } from "vuelidate";
import { required } from "vuelidate/lib/validators";

import { auth } from "@/firebase";

export default {
  name: "PageAuthorization",

  mixins: [validationMixin],

  data() {
    return {
      form: {
        email: "",
        password: ""
      },
      isError: false,
      isSubmitting: false
    };
  },

  validations: {
    form: {
      email: { required },
      password: { required }
    }
  },

  computed: {
    errorMessage() {
      return this.isError ? "Invalid e-mail or password" : "";
    }
  },

  methods: {
    signIn() {
      this.isError = false;
      this.isSubmitting = true;
      auth
        .signInWithEmailAndPassword(this.form.email, this.form.password)
        .then(() => this.$router.push({ name: "PageChats" }))
        .catch(() => (this.isError = true))
        .finally(() => (this.isSubmitting = false));
    }
  }
};
</script>

<style></style>
