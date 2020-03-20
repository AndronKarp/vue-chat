import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import firebaseConfig from "./configs/firebase";
import firebase from "firebase/app";
import vuetify from "./plugins/vuetify";

Vue.config.productionTip = false;

firebase.initializeApp(firebaseConfig);

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount("#app");
