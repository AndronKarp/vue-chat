import Vue from "vue";

import { auth } from "@/firebase";
import store from "@/store";

const authPlugin = {
  install() {
    auth.onAuthStateChanged(user => store.dispatch("user/authorize", user));
  }
};

Vue.use(authPlugin);

export default authPlugin;
