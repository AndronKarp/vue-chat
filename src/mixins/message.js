export default {
  data() {
    return {
      messageText: ""
    };
  },
  computed: {
    isMessageEmpty() {
      return this.messageText.length === 0;
    }
  },
  methods: {
    setMessageText(value) {
      this.messageText = value;
    }
  }
};
