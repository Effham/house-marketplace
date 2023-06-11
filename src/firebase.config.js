// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore'
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD51Sv3Ga7Vjxq4Bi2oUqW1vnRp6Kalteo",
  authDomain: "house-marketplace-app-28e99.firebaseapp.com",
  projectId: "house-marketplace-app-28e99",
  storageBucket: "house-marketplace-app-28e99.appspot.com",
  messagingSenderId: "1045375520270",
  appId: "1:1045375520270:web:639c94cfc69e7efdb9765f"
};

initializeApp(firebaseConfig);
export const db = getFirestore()