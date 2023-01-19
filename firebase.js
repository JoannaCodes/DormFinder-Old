import firebase from 'firebase';
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";


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
const analytics = getAnalytics(app);