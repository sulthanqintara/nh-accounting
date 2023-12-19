// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBo7FiPxIfiSHwGJrpLDfcW8d01cT_Sm8w",
    authDomain: "accounting-nurul-hidayah-dev.firebaseapp.com",
    projectId: "accounting-nurul-hidayah-dev",
    storageBucket: "accounting-nurul-hidayah-dev.appspot.com",
    messagingSenderId: "431161898804",
    appId: "1:431161898804:web:b32fb2df1c6c7029e2d761",
};

// Initialize Firebase
const app = getApps.length ? getApp() : initializeApp(firebaseConfig);
const auth = getAuth();

export { app, auth };
