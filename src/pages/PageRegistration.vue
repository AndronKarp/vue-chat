<template>
  <VForm @submit.prevent="register" class="d-flex flex-column">
    <VTextField
      v-model="$v.form.displayName.$model"
      label="Name"
      :error-messages="errorMessage('displayName')"
      :success="!$v.form.displayName.$invalid"
      outlined
      dense
    />
    <VTextField
      :value="form.email"
      label="E-mail"
      type="email"
      :error-messages="errorMessage('email')"
      :success="!$v.form.email.$invalid"
      outlined
      dense
      @change="onEmailChange"
    />
    <VTextField
      v-model="$v.form.password.$model"
      label="Password"
      type="password"
      :error-messages="errorMessage('password')"
      :success="!$v.form.password.$invalid"
      outlined
      dense
    />
    <VTextField
      v-model="$v.form.confirmPassword.$model"
      label="Confirm password"
      type="password"
      :error-messages="errorMessage('confirmPassword')"
      :success="!$v.form.confirmPassword.$invalid"
      outlined
      dense
    />
    <span class="align-self-center mb-4">
      Already have an account?
      <RouterLink to="/auth">Sign in!</RouterLink>
    </span>
    <VBtn
      class="align-self-center"
      type="submit"
      color="amber darken-4"
      :dark="!$v.form.$invalid"
      :disabled="$v.form.$invalid"
      :loading="isFormSubmitting"
      >Sign Up</VBtn
    >
  </VForm>
</template>

<script>
import { validationMixin } from "vuelidate";
import * as validators from "vuelidate/lib/validators";
import { mapState } from "vuex";

import { auth, userEmailsRef } from "@/firebase";
import { registrationErrors } from "@/utils/constants";
import { isEmailUnique } from "@/utils/validators";

export default {
  name: "PageRegistration",

  mixins: [validationMixin],

  data() {
    return {
      form: {
        displayName: "",
        email: "",
        password: "",
        confirmPassword: ""
      },
      isFormSubmitting: false
    };
  },

  validations: {
    form: {
      displayName: {
        required: validators.required,
        alpha: validators.alpha,
        minLength: validators.minLength(2)
      },
      email: {
        required: validators.required,
        email: validators.email,
        unique: isEmailUnique
      },
      password: {
        required: validators.required,
        alphaNum: validators.alphaNum,
        minLength: validators.minLength(6)
      },
      confirmPassword: {
        required: validators.required,
        sameAsPassword: validators.sameAs(function() {
          return this.form.password;
        })
      }
    }
  },

  computed: {
    ...mapState({ user: "user/user" }),
    errorMessage: () =>
      function(field) {
        if (!this.$v.form[field].$error) return;

        const errorMessages = Object.entries(registrationErrors[field]);
        const [, errorMessage] =
          errorMessages.find(([k]) => !this.$v.form[field][k]) ?? [];
        return errorMessage;
      }
  },

  methods: {
    async register() {
      this.isFormSubmitting = true;
      const { email, password, displayName } = this.form;
      const { user } = await auth.createUserWithEmailAndPassword(
        email,
        password
      );
      await user.updateProfile({ displayName });
      this.$store.dispatch("user/authorize", { ...user, displayName });
      await userEmailsRef.child(user.uid).set({ value: email });
      this.$router.push({ name: "PageChats" });
      this.isFormSubmitting = false;
    },
    onEmailChange(v) {
      this.form.email = v;
      this.$v.form.email.$touch();
    }
  }
};
</script>

<style></style>
