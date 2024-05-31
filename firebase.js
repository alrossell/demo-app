// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBXcNzBmwNN7Noa6AMbC2lznSYhWoYgB8I",
  authDomain: "expo-demo-b3d7a.firebaseapp.com",
  databaseURL: "https://expo-demo-b3d7a-default-rtdb.firebaseio.com",
  projectId: "expo-demo-b3d7a",
  storageBucket: "expo-demo-b3d7a.appspot.com",
  messagingSenderId: "440163905171",
  appId: "1:440163905171:web:921e6efe0e2cadc14e2766",
  measurementId: "G-6WH481J7VG"
};

// Initialize Firebase
// export const App = initializeApp(firebaseConfig);
const app = initializeApp(firebaseConfig);
export const database = getDatabase(app);
export const auth = getAuth(app);
