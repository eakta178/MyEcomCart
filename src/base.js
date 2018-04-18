import Rebase from "re-base";
import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyCP5sK0LZPKWnfNyxoxoicTwaNjRz_jJ0Y",
  authDomain: "catchoftheday-8cd17.firebaseapp.com",
  databaseURL: "https://catchoftheday-8cd17.firebaseio.com"
});

const base = Rebase.createClass(firebaseApp.database());

// This is a named export
export { firebaseApp };

// this is a default export
export default base;
