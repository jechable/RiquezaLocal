import { initializeApp } from "firebase/app";
import { getFirestore  } from 'firebase/firestore';
import { getAuth } from 'firebase/auth'
console.log(import.meta.env);
const firebaseConfig = {
  apiKey: import.meta.env.VITE_API,
  authDomain: import.meta.env.VITE_A,
  projectId: import.meta.env.VITE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_APP_ID,
  measurementId: import.meta.env.VITE_MEASUREMENT_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const Db = getFirestore(app);
const auth = getAuth(app);

export {Db,auth};
