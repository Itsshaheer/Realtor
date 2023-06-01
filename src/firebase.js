// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import{Firestore, getFirestore} from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCVx-6RqMDgILU5MhWsMU6Uu53-Makia6A",
  authDomain: "realtor-e0c37.firebaseapp.com",
  projectId: "realtor-e0c37",
  storageBucket: "realtor-e0c37.appspot.com",
  messagingSenderId: "225832290373",
  appId: "1:225832290373:web:7f6a2110ad92e8d3b8fb2c"
};

// Initialize Firebase
 initializeApp(firebaseConfig);
 export const db= getFirestore()
