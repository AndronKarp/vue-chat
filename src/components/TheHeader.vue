<template>
  <v-app-bar app color="amber darken-4" dark>
    <v-app-bar-nav-icon v-if="$route.name === 'PageChats'" @click="toggleNav" />
    <v-btn v-else icon @click="backToChats">
      <v-icon>mdi-arrow-left</v-icon>
    </v-btn>
    <v-toolbar-title>{{ $route.meta.title }}</v-toolbar-title>
  </v-app-bar>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "TheHeader",

  computed: {
    ...mapState({ user: "user/user" })
  },

  methods: {
    toggleNav() {
      this.$emit("navButtonClick");
    },
    backToChats() {
      this.$router.push({ name: "PageChats" });
    }
  }
};
</script>

<style></style>
