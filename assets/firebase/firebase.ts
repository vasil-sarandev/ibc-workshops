// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

// THIS IS A SAMPLE SINCE THIS IS A PUBLIC REPOSITORY. SECRETS ARE NOT EXPOSED.
const firebaseConfig = {
  apiKey: "firebaseApiKey",
  authDomain: "authDomain",
  projectId: "projectId",
  storageBucket: "storageBucket",
  messagingSenderId: "messagingSenderId",
  databaseURL: "databaseURL",
  appId: "appId",
  measurementId: "measurementId",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const database = getDatabase(app);
