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
        v-model="$v.form.name.$model"
        placeholder="Your name..."
        type="text"
        dense
        outlined
        style="width: 100%"
        :error-messages="nameErrors"
        :success="!$v.form.name.$invalid"
      ></v-text-field>
      <v-text-field
        v-model="$v.form.email.$model"
        placeholder="Your e-mail..."
        type="email"
        dense
        outlined
        style="width: 100%"
        :error-messages="emailErrors"
        :success="!$v.form.email.$invalid"
      ></v-text-field>
      <v-text-field
        v-model="$v.form.password.$model"
        placeholder="Your password..."
        type="password"
        dense
        outlined
        style="width: 100%"
        :error-messages="passwordErrors"
        :success="!$v.form.password.$invalid"
      ></v-text-field>
      <v-text-field
        v-model="$v.form.confirmPassword.$model"
        placeholder="Confirm password..."
        type="password"
        dense
        outlined
        style="width: 100%"
        :error-messages="confirmPasswordErrors"
        :success="!$v.form.confirmPassword.$invalid"
      ></v-text-field>
      <v-btn
        @click="register"
        color="amber darken-4"
        :dark="!$v.form.$invalid"
        :disabled="$v.form.$invalid"
        :loading="isLoading"
        >Sign Up</v-btn
      >
    </v-form>
    <v-container v-else class="d-flex flex-column justify-center align-center">
      <p>Signed in as {{ currentUser.email }}</p>
    </v-container>
  </v-container>
</template>

<script>
import { validationMixin } from "vuelidate";
import * as validators from "vuelidate/lib/validators";
import { auth, userEmailsRef } from "../configs/firebase";
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      isLoading: false,
      form: {
        name: null,
        email: null,
        password: null,
        confirmPassword: null
      }
    };
  },
  validations: {
    form: {
      name: {
        required: validators.required,
        alpha: validators.alpha,
        minLength: validators.minLength(2)
      },
      email: {
        required: validators.required,
        email: validators.email,
        emailIsNotTaken(value) {
          return !this.isEmailTaken(value);
        }
      },
      password: {
        required: validators.required,
        alphaNum: validators.alphaNum,
        minLength: validators.minLength(6)
      },
      confirmPassword: {
        required: validators.required,
        sameAsPassword: validators.sameAs("password")
      }
    }
  },
  computed: {
    ...mapGetters(["currentUser", "isEmailTaken"]),
    nameErrors() {
      const errors = [];
      if (!this.$v.form.name.$dirty) return errors;
      !this.$v.form.name.required && errors.push("Required field");
      !this.$v.form.name.minLength &&
        errors.push("Name must have at least 2 characters");
      !this.$v.form.name.alpha && errors.push("Name must contain letters only");
      return errors;
    },
    emailErrors() {
      const errors = [];
      if (!this.$v.form.email.$dirty) return errors;
      !this.$v.form.email.required && errors.push("Required field");
      !this.$v.form.email.email && errors.push("Invalid e-mail");
      !this.$v.form.email.emailIsNotTaken &&
        errors.push("E-mail is already taken");
      return errors;
    },
    passwordErrors() {
      const errors = [];
      if (!this.$v.form.password.$dirty) return errors;
      !this.$v.form.password.required && errors.push("Required field");
      !this.$v.form.password.minLength &&
        errors.push("Password must have at least 6 characters");
      !this.$v.form.password.alphaNum &&
        errors.push("Password must contain letters and/or numbers only");
      return errors;
    },
    confirmPasswordErrors() {
      const errors = [];
      if (!this.$v.form.confirmPassword.$dirty) return errors;
      !this.$v.form.confirmPassword.required && errors.push("Required field");
      !this.$v.form.confirmPassword.sameAsPassword &&
        errors.push("Passwords don't match");
      return errors;
    }
  },
  methods: {
    async register() {
      this.$v.form.$touch();
      this.isLoading = true;
      await auth().createUserWithEmailAndPassword(
        this.form.email,
        this.form.password
      );
      const currentUser = auth().currentUser;
      await currentUser.updateProfile({ displayName: this.form.name });
      this.$router.push("/");
      this.isLoading = false;
      userEmailsRef.child(currentUser.uid).set({ value: currentUser.email });
    }
  },
  mixins: [validationMixin]
};
</script>

<style></style>
