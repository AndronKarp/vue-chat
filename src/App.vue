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
        this.$store.dispatch("updateAreMessagesLoadedStatus", true);
      });
      messagesRef.on("child_removed", snapshot => {
        const deletedMessage = this.messages.find(
          message => message.id === snapshot.key
        );
        const index = this.messages.indexOf(deletedMessage);
        this.$store.dispatch("removeMessage", index);
      });
      messagesRef.on("child_changed", snapshot => {
        const updatedMessage = this.messages.find(
          message => message.id === snapshot.key
        );
        updatedMessage.text = snapshot.val().text;
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
