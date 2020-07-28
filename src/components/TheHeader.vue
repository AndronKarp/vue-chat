<template>
  <v-app-bar app color="amber darken-4" dark>
    <v-app-bar-nav-icon @click="toggleNav" />
    <v-toolbar-title>Vue Chat</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-btn v-if="currentUser" @click="signOut" icon>
      <v-icon>mdi-logout</v-icon>
    </v-btn>
  </v-app-bar>
</template>

<script>
import { mapGetters } from "vuex";
import { auth } from "../configs/firebase";

export default {
  computed: {
    ...mapGetters(["currentUser"])
  },
  methods: {
    toggleNav() {
      this.$emit("navButtonClick");
    },
    async signOut() {
      await auth.signOut();
      this.$router.push("/auth");
    }
  }
};
</script>

<style></style>
