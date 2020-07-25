<template>
  <div id="app">
    <main-layout></main-layout>
  </div>
</template>

<script>
import MainLayout from "./layouts/MainLayout";
import { messagesRef, userEmailsRef, auth } from "./configs/firebase";
import { mapGetters } from "vuex";

export default {
  name: "App",
  computed: {
    ...mapGetters(["messages"])
  },
  methods: {
    setFirebaseEvents() {
      auth().onAuthStateChanged(user => {
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
    }
  },
  created() {
    this.setFirebaseEvents();
  },
  components: {
    MainLayout
  }
};
</script>
