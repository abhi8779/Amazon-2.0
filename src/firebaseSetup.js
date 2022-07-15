// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getFirestore } from "firebase/firestore";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyABnyvEZCrLDpiAFEuOGHxk9D82XJ1RmOY",
//   authDomain: "fir-dd55f.firebaseapp.com",
//   projectId: "fir-dd55f",
//   storageBucket: "fir-dd55f.appspot.com",
//   messagingSenderId: "647369458407",
//   appId: "1:647369458407:web:0c8b46c4c2a3ba5aaa5842",
//   measurementId: "G-C1B20TR8PB",
// };

// export const app = initializeApp(firebaseConfig);

// // Initialize Firebase

// export const db = getFirestore(app);

import firebase from "firebase";

// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyABnyvEZCrLDpiAFEuOGHxk9D82XJ1RmOY",
  authDomain: "fir-dd55f.firebaseapp.com",
  projectId: "fir-dd55f",
  storageBucket: "fir-dd55f.appspot.com",
  messagingSenderId: "647369458407",
  appId: "1:647369458407:web:0c8b46c4c2a3ba5aaa5842",
  measurementId: "G-C1B20TR8PB",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const auth = firebase.auth();

export { db, auth };
