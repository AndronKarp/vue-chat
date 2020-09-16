<template>
  <v-app id="app">
    <component :is="$route.meta.layout">
      <router-view></router-view>
    </component>
  </v-app>
</template>

<script>
import { auth } from "./configs/firebase";
import { mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters(["currentUser"])
  },
  created() {
    this.setAuthObserver();
  },
  methods: {
    setAuthObserver() {
      auth.onAuthStateChanged(user => {
        this.$store.dispatch("authorize", user);
        if (user) this.$store.dispatch("fetchChats");
      });
    }
  }
};
</script>
