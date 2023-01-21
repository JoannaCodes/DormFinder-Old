// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBRFrT74RQxoCMo1RFSULpuz0g18LnyzLE",
  authDomain: "dormfinder-5e354.firebaseapp.com",
  databaseURL: "https://dormfinder-5e354-default-rtdb.firebaseio.com",
  projectId: "dormfinder-5e354",
  storageBucket: "dormfinder-5e354.appspot.com",
  messagingSenderId: "152129696735",
  appId: "1:152129696735:web:ab504e02cb30fa728d8a6a",
  measurementId: "G-RK12X90BX6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const storage = getStorage(app);

export { db, storage };