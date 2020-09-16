<template>
  <v-app-bar app color="amber darken-4" dark>
    <v-app-bar-nav-icon v-if="$route.path === '/'" @click="toggleNav" />
    <v-btn v-else icon @click="backToChatList">
      <v-icon>mdi-arrow-left</v-icon>
    </v-btn>
    <v-toolbar-title>{{ $route.meta.title }}</v-toolbar-title>
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
    },
    backToChatList() {
      this.$router.push({ name: "PageChatList" });
    }
  }
};
</script>

<style></style>
