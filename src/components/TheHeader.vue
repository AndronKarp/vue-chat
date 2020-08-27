<template>
  <v-app-bar app color="amber darken-4" dark>
    <v-app-bar-nav-icon @click="toggleNav" />
    <v-toolbar-title>Vue Chat</v-toolbar-title>
  </v-app-bar>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters(["currentUser"])
  },
  methods: {
    toggleNav() {
      this.$emit("navButtonClick");
    }
  }
};
</script>

<style></style>
