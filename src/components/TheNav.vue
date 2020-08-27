<template>
  <v-navigation-drawer :value="value" @input="onInput" app>
    <v-list dense>
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
import { mapGetters } from "vuex";
import { auth } from "../configs/firebase";

export default {
  props: ["value"],
  computed: {
    ...mapGetters(["currentUser"])
  },
  methods: {
    onInput(value) {
      this.$emit("input", value);
    },
    async signOut() {
      await auth.signOut();
      this.$router.push("/auth");
    }
  }
};
</script>

<style></style>
