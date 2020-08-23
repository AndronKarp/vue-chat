<template>
  <v-card class="elevation-12">
    <v-toolbar dark flat color="amber darken-4">
      <v-toolbar-title>Create your account</v-toolbar-title>
    </v-toolbar>
    <v-card-text
      ><v-form @submit.prevent="register" class="text-center">
        <v-text-field
          v-for="(field, index) in Object.keys(form)"
          :key="index"
          v-model="$v.form[field].value.$model"
          :label="form[field].label"
          :type="form[field].type"
          :error-messages="validationErrorMessages(field)"
          :success="!$v.form[field].$invalid"
          outlined
          dense
        ></v-text-field>
        <p>
          Already have an account?
          <router-link to="/auth">Sign in!</router-link>
        </p>
        <v-btn
          type="submit"
          color="amber darken-4"
          :dark="!$v.form.$invalid"
          :disabled="$v.form.$invalid"
          :loading="isFormSubmitting"
          >Sign Up</v-btn
        >
      </v-form>
    </v-card-text>
  </v-card>
</template>

<script>
import { validationMixin } from "vuelidate";
import * as validators from "vuelidate/lib/validators";
import { auth, userEmailsRef } from "../configs/firebase";
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      form: {
        name: {
          type: "text",
          label: "Name",
          validations: {
            required: {
              rule: validators.required,
              errorMessage: "Required field"
            },
            alpha: {
              rule: validators.alpha,
              errorMessage: "Name must contain only letters"
            },
            minLength: {
              rule: validators.minLength(2),
              errorMessage: "Name must have at least 2 characters"
            }
          },
          value: null
        },
        email: {
          type: "email",
          label: "E-mail",
          validations: {
            required: {
              rule: validators.required,
              errorMessage: "Required field"
            },
            email: {
              rule: validators.email,
              errorMessage: "Invalid e-mail"
            },
            unique: {
              rule(email) {
                return !this.isEmailTaken(email);
              },
              errorMessage: "E-mail is already taken"
            }
          },
          value: null
        },
        password: {
          type: "password",
          label: "Password",
          validations: {
            required: {
              rule: validators.required,
              errorMessage: "Required field"
            },
            alphaNum: {
              rule: validators.alphaNum,
              errorMessage: "Password must contain only letters and/or numbers"
            },
            minLength: {
              rule: validators.minLength(6),
              errorMessage: "Password must contain at least 6 characters"
            }
          },
          value: null
        },
        confirmPassword: {
          type: "password",
          label: "Confirm password",
          validations: {
            required: {
              rule: validators.required,
              errorMessage: "Required field"
            },
            sameAsPassword: {
              rule: validators.sameAs(function() {
                return this.form.password.value;
              }),
              errorMessage: "Passwords don't match"
            }
          },
          value: null
        }
      },
      isFormSubmitting: false
    };
  },
  validations() {
    const form = {};
    const formFields = Object.entries(this.form);
    formFields.forEach(([fieldName, field]) => {
      const value = {};
      const validations = Object.entries(field.validations);
      validations.forEach(([validationName, validation]) => {
        value[validationName] = validation.rule;
      });
      form[fieldName] = { value };
    });
    return { form };
  },
  computed: {
    ...mapGetters(["currentUser", "isEmailTaken"]),
    validationErrorMessages: () =>
      function(field) {
        const errorMessages = [];
        if (!this.$v.form[field].value.$dirty) return errorMessages;
        const validations = Object.entries(this.form[field].validations);
        validations.forEach(([name, validation]) => {
          !this.$v.form[field].value[name] &&
            errorMessages.push(validation.errorMessage);
        });
        return errorMessages;
      }
  },
  methods: {
    async register() {
      this.isFormSubmitting = true;
      await auth.createUserWithEmailAndPassword(
        this.form.email,
        this.form.password
      );
      const currentUser = auth.currentUser;
      await currentUser.updateProfile({ displayName: this.form.name });
      this.$router.push("/");
      this.isFormSubmitting = false;
      userEmailsRef.child(currentUser.uid).set({ value: currentUser.email });
    }
  },
  mixins: [validationMixin]
};
</script>

<style></style>
