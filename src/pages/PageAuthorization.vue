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
        :error-messages="isEmailEmpty"
        style="width: 100%"
      ></v-text-field>
      <v-text-field
        v-model="$v.form.password.$model"
        placeholder="Your password..."
        type="password"
        dense
        outlined
        :error-messages="isPasswordEmpty"
        style="width: 100%"
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
    <v-container v-else class="d-flex justify-center"
      >Signed in as {{ currentUser.email }}</v-container
    >
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
      }
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
    isEmailEmpty() {
      return this.$v.form.email.$dirty && !this.$v.form.email.required
        ? "Required field"
        : null;
    },
    isPasswordEmpty() {
      return this.$v.form.password.$dirty && !this.$v.form.password.required
        ? "Required field"
        : null;
    }
  },
  methods: {
    async signIn() {
      this.$v.form.$touch();
      this.isLoading = true;
      await auth().signInWithEmailAndPassword(
        this.form.email,
        this.form.password
      );
      this.$router.push("/");
      this.isLoading = false;
    }
  },
  mixins: [validationMixin]
};
</script>

<style></style>
