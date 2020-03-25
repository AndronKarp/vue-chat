import { auth } from "../configs/firebase";

export default {
  methods: {
    logOut() {
      auth().signOut();
    }
  }
};
