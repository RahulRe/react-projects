// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider} from "firebase/auth"
import {getFirestore} from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDHxuqFg8yzEou_OPali5yO4LvAoT_qfQ4",
  authDomain: "social-media-13f26.firebaseapp.com",
  projectId: "social-media-13f26",
  storageBucket: "social-media-13f26.appspot.com",
  messagingSenderId: "607559021105",
  appId: "1:607559021105:web:7cad32c577b6577b68db10"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app)