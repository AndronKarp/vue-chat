<template>
  <v-app id="app">
    <component :is="$route.meta.layout || 'div'">
      <router-view></router-view>
    </component>
  </v-app>
</template>

<script>
import { userEmailsRef, auth } from "./configs/firebase";
import { mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters(["currentUser"])
  },
  created() {
    this.setFirebaseEvents();
  },
  methods: {
    setFirebaseEvents() {
      auth.onAuthStateChanged(user => {
        this.$store.dispatch("authorize", user);
      });
      userEmailsRef.on("child_added", snapshot => {
        this.$store.dispatch("addUserEmail", snapshot.val());
      });
    }
  }
};
</script>
