<template>
  <v-app id="app">
    <template v-if="areMessagesLoaded">
      <TheNav v-model="isNavVisible" />
      <TheHeader @navButtonClick="toggleNav" />
      <v-content>
        <router-view></router-view>
      </v-content>
      <TheFooter />
    </template>
    <div v-else class="d-flex justify-center align-center" style="height: 100%">
      <v-progress-circular
        indeterminate
        color="amber darken-4"
      ></v-progress-circular>
    </div>
  </v-app>
</template>

<script>
import TheNav from "./components/TheNav";
import TheHeader from "./components/TheHeader";
import TheFooter from "./components/TheFooter";
import { messagesRef, userEmailsRef, auth } from "./configs/firebase";
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      isNavVisible: null
    };
  },
  computed: {
    ...mapGetters(["areMessagesLoaded"])
  },
  created() {
    this.setFirebaseEvents();
  },
  methods: {
    setFirebaseEvents() {
      auth.onAuthStateChanged(user => {
        this.$store.dispatch("authorize", user);
      });
      messagesRef.once("value", () => {
        messagesRef.on("child_added", snapshot => {
          this.$store.dispatch("addMessage", {
            ...snapshot.val(),
            id: snapshot.key
          });
        });
        this.$store.dispatch("setAreMessagesLoadedStatusToTrue");
      });
      messagesRef.on("child_removed", snapshot => {
        const messageId = snapshot.key;
        this.$store.dispatch("removeMessage", messageId);
      });
      messagesRef.on("child_changed", snapshot => {
        const { text } = snapshot.val();
        this.$store.dispatch("editMessage", { messageId: snapshot.key, text });
      });
      userEmailsRef.on("child_added", snapshot => {
        this.$store.dispatch("addUserEmail", snapshot.val());
      });
    },
    toggleNav() {
      this.isNavVisible = !this.isNavVisible;
    }
  },
  components: {
    TheNav,
    TheHeader,
    TheFooter
  }
};
</script>
