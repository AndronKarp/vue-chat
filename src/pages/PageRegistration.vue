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
        emailIsTaken(value) {
          return this.isEmailTaken(value);
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
      if (this.$v.form.name.$dirty && !this.$v.form.name.required) {
        return "Required field";
      } else if (!this.$v.form.name.minLength) {
        return "Name must have at least 2 characters";
      } else if (!this.$v.form.name.alpha) {
        return "Name must contain only letters";
      }
      return null;
    },
    emailErrors() {
      if (this.$v.form.email.$dirty && !this.$v.form.email.required) {
        return "Required field";
      } else if (!this.$v.form.email.email) {
        return "Invalid e-mail";
      } else if (this.$v.form.email.emailIsTaken) {
        return "E-mail is already taken";
      }
      return null;
    },
    passwordErrors() {
      if (this.$v.form.password.$dirty && !this.$v.form.password.required) {
        return "Required field";
      } else if (!this.$v.form.password.minLength) {
        return "Password must have at least 6 characters";
      } else if (!this.$v.form.password.alphaNum) {
        return "Password must contain letters and numbers only";
      }
      return null;
    },
    confirmPasswordErrors() {
      if (
        this.$v.form.confirmPassword.$dirty &&
        !this.$v.form.confirmPassword.required
      ) {
        return "Required field";
      } else if (
        !this.$v.form.confirmPassword.sameAsPassword &&
        this.$v.form.confirmPassword.$dirty
      ) {
        return "Passwords don't match";
      }
      return null;
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
      userEmailsRef.child(currentUser.uid).set({ email: currentUser.email });
    }
  },
  mixins: [validationMixin]
};
</script>

<style></style>
