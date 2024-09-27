// firebaseConfig.ts
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCqEal_-SgoW6C2Y0GlTKl_ZQaVhsfs1m4",
  authDomain: "country-searching-77c0f.firebaseapp.com",
  projectId: "country-searching-77c0f",
  storageBucket: "country-searching-77c0f.appspot.com",
  messagingSenderId: "433608486023",
  appId: "1:433608486023:web:72da23eff8ade2811adc22"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
