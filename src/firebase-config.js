import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import {getFirestore} from 'firebase/firestore';
import { getStorage } from "firebase/storage";
import {getAuth,GoogleAuthProvider} from'firebase/auth';
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCxL-nEPhebKa_v3Qo7XD3ys_2D8Ihbgv8",
  authDomain: "blog-fbb86.firebaseapp.com",
  projectId: "blog-fbb86",
  storageBucket: "blog-fbb86.appspot.com",
  messagingSenderId: "855013079732",
  appId: "1:855013079732:web:58d4975bb72c501164f5e1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);
export const provider = new GoogleAuthProvider();
provider.setCustomParameters({
  prompt: 'select_account'
});