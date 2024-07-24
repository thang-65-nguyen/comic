import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyAmDHNZ-IdI1YDTDElFDCYR_6EA-v_dQj8",
  authDomain: "comic-a56cc.firebaseapp.com",
  projectId: "comic-a56cc",
  storageBucket: "comic-a56cc.appspot.com",
  messagingSenderId: "467545080904",
  appId: "1:467545080904:web:844a5d30db7d318f3c047d",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export const db = getFirestore(app);
const provider = new GoogleAuthProvider();
export { auth, provider, signInWithPopup, signOut };
