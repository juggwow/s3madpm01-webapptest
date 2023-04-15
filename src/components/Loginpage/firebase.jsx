// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCt6ui9PsvPlN_Lfl8p-udn9sPvT7XgG6s",
  authDomain: "s3madpm-01.firebaseapp.com",
  projectId: "s3madpm-01",
  storageBucket: "s3madpm-01.appspot.com",
  messagingSenderId: "838458305884",
  appId: "1:838458305884:web:6b258a0a5f2b599c4be599"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app)