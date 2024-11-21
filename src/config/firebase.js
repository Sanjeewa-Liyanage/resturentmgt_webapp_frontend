// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyAwUziAWibrLfx2Yv0qT-ugrWjrJsYKXXU",
  authDomain: "grocery-app-sample.firebaseapp.com",
  databaseURL: "https://grocery-app-sample-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "grocery-app-sample",
  storageBucket: "grocery-app-sample.appspot.com",
  messagingSenderId: "320568422887",
  appId: "1:320568422887:web:43d9d822a6ebbc4d5d8d42",
  measurementId: "G-8D8LDGRES5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export default app;