// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-analytics.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyBjstpI_fAue1KCpFd4UhopLWgq1yCqIKI",
  authDomain: "foricon-dce6c.firebaseapp.com",
  projectId: "foricon-dce6c",
  storageBucket: "foricon-dce6c.appspot.com",
  messagingSenderId: "704597009774",
  appId: "1:704597009774:web:169e7ddcc5a16457750d7f",
  measurementId: "G-MHEQ5S826Q",
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const analytics = getAnalytics(app);
const dbFirestore = getFirestore(app);
export { app, auth, analytics, dbFirestore };
