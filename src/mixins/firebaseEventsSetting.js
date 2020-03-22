export default {
  methods: {
    setFirebaseEvents(messagesRef) {
      messagesRef.on("child_added", snapshot => {
        this.$store.dispatch("addMessage", {
          ...snapshot.val(),
          id: snapshot.key
        });
      });
      messagesRef.on("child_removed", snapshot => {
        const deletedMessage = this.$store.getters.messages.find(
          message => message.id === snapshot.key
        );
        const index = this.$store.getters.messages.indexOf(deletedMessage);
        this.$store.dispatch("removeMessage", index);
      });
    }
  }
};
