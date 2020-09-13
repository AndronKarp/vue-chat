import firebase from "firebase";

const config = {
  apiKey: "AIzaSyC6ASZVYQXyUcdIWzpMECRwOLbLhc4_fZg",
  authDomain: "vue-chat-ed577.firebaseapp.com",
  databaseURL: "https://vue-chat-ed577.firebaseio.com",
  projectId: "vue-chat-ed577",
  storageBucket: "vue-chat-ed577.appspot.com",
  messagingSenderId: "508988664046",
  appId: "1:508988664046:web:6f8664a947b6f3bec26bff",
  measurementId: "G-WKVV3SBY2E"
};

firebase.initializeApp(config);

const database = firebase.firestore();
const auth = firebase.auth();
auth.getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const unsubscribe = firebase.auth().onAuthStateChanged(user => {
      unsubscribe();
      resolve(user);
    }, reject);
  });
};

export { database, auth };
