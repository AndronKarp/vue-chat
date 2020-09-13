export default {
  data() {
    return {
      response: []
    };
  },
  methods: {
    setSnapshotListener(ref) {
      ref.onSnapshot(this.processResponse);
    },
    processResponse({ docs }) {
      this.response = docs.map(doc => ({ ...doc.data(), id: doc.id }));
    }
  }
};
