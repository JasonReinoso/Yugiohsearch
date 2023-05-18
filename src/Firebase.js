// Import the functions you need from the SDKs you need

import { getAuth } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getDatabase} from "firebase/database";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD5DarI39e-SKI7n3OprtS4rmCnwy0ptB4",
  authDomain: "yugi-e6acc.firebaseapp.com",
  databaseURL: "https://yugi-e6acc-default-rtdb.firebaseio.com",
  projectId: "yugi-e6acc",
  storageBucket: "yugi-e6acc.appspot.com",
  messagingSenderId: "845616232057",
  appId: "1:845616232057:web:5b593895219026f85886a8",
  measurementId: "G-PFY9585MWL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth(app);
// Initialize Firebase Authentication and get a reference to the service

 export const db = getDatabase(app);
// gets database info from firebase.




