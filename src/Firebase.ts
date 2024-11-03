// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore  } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
console.log(import.meta.env);
const firebaseConfig = {
  apiKey: "AIzaSyBfwGrVidbSpRWMKij4p11GLrVaNBRdmHY",
  authDomain: "riquezalocal-cade9.firebaseapp.com",
  projectId: "riquezalocal-cade9",
  storageBucket: "riquezalocal-cade9.firebasestorage.app",
  messagingSenderId: "985115637521",
  appId: "1:985115637521:web:dee79d224c54b98ecbbeb0",
  measurementId: "G-V4XQVSE1WR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const Db = getFirestore(app);
const auth = getAuth(app);

export {Db,auth};
