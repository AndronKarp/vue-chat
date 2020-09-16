<template>
  <v-navigation-drawer temporary :value="isVisible" @input="onInput" app>
    <v-list nav dense>
      <v-list-item @click="signOut">
        <v-list-item-action>
          <v-icon>mdi-logout</v-icon>
        </v-list-item-action>
        <v-list-item-content>Sign out</v-list-item-content>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import { auth } from "../configs/firebase";

export default {
  props: {
    isVisible: {
      type: Boolean,
      required: true
    }
  },
  model: {
    prop: "isVisible",
    event: "input"
  },
  methods: {
    onInput(value) {
      this.$emit("input", value);
    },
    async signOut() {
      this.$store.dispatch("clearChats");
      await auth.signOut();
      this.$router.push("/auth");
    }
  }
};
</script>

<style></style>
