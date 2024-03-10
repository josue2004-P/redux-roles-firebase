// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBHpJOojfxj3J1eR6Q-twQzxU3U4B8enKk",
  authDomain: "login-42532.firebaseapp.com",
  projectId: "login-42532",
  storageBucket: "login-42532.appspot.com",
  messagingSenderId: "1974375738",
  appId: "1:1974375738:web:9395de7544dd0047bdec03"
};

// Initialize Firebase
export const FirebaseApp  = initializeApp(firebaseConfig);
export const FirebaseAuth = getAuth( FirebaseApp );
export const FirebaseDB   = getFirestore( FirebaseApp );