<template>
  <div id="app">
    <main-layout></main-layout>
  </div>
</template>

<script>
import MainLayout from "./layouts/MainLayout";
import { messagesRef } from "./configs/firebase";
import { mapGetters, mapActions } from "vuex";

export default {
  name: "App",
  computed: {
    ...mapGetters(["messages"])
  },
  methods: {
    ...mapActions([
      "addMessage",
      "removeMessage",
      "updateAreMessagesLoadedStatus"
    ]),
    setFirebaseEvents() {
      messagesRef.once("value", () => {
        messagesRef.on("child_added", snapshot => {
          this.addMessage({
            ...snapshot.val(),
            id: snapshot.key
          });
        });
        this.updateAreMessagesLoadedStatus(true);
      });
      messagesRef.on("child_removed", snapshot => {
        const deletedMessage = this.messages.find(
          message => message.id === snapshot.key
        );
        const index = this.messages.indexOf(deletedMessage);
        this.removeMessage(index);
      });
      messagesRef.on("child_changed", snapshot => {
        const updatedMessage = this.messages.find(
          message => message.id === snapshot.key
        );
        updatedMessage.text = snapshot.val().text;
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
