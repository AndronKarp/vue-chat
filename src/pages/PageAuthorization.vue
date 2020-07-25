<template>
  <v-container
    class="d-flex flex-column justify-center align-center"
    style="width: 100%; height: 100%"
  >
    <v-form
      v-if="!currentUser"
      class="d-flex flex-column align-center"
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
        @click="signIn"
        color="amber darken-4"
        :dark="!$v.form.$invalid"
        :disabled="$v.form.$invalid"
        :loading="isLoading"
        >Sign In</v-btn
      >
    </v-form>
    <v-container v-else class="d-flex flex-column justify-center align-center">
      <p>Signed in as {{ currentUser.email }}</p>
    </v-container>
  </v-container>
</template>

<script>
import { validationMixin } from "vuelidate";
import { required } from "vuelidate/lib/validators";
import { mapGetters } from "vuex";
import { auth } from "../configs/firebase";

export default {
  data() {
    return {
      isLoading: false,
      form: {
        email: null,
        password: null
      },
      authError: false
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
      this.$v.form.$touch();
      this.authError = false;
      this.isLoading = true;
      auth
        .signInWithEmailAndPassword(this.form.email, this.form.password)
        .then(() => this.$router.push("/"))
        .catch(() => {
          this.authError = true;
        })
        .finally(() => (this.isLoading = false));
    }
  },
  mixins: [validationMixin]
};
</script>

<style></style>
