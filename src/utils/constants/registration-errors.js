export default {
  displayName: {
    required: "Required field",
    alpha: "Name must contain only letters",
    minLength: "Name must have at least 2 characters"
  },
  email: {
    required: "Required field",
    email: "Invalid e-mail",
    unique: "E-mail is already taken"
  },
  password: {
    required: "Required field",
    alphaNum: "Password must contain only letters and/or numbers",
    minLength: "Password must contain at least 6 characters"
  },
  confirmPassword: {
    required: "Required field",
    sameAsPassword: "Passwords don't match"
  }
};
