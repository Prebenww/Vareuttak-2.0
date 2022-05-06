// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAAiv3nt_fT87lDS1GZW3kMtvqke_HNHBE",
    authDomain: "e-shop-e904d.firebaseapp.com",
    projectId: "e-shop-e904d",
    storageBucket: "e-shop-e904d.appspot.com",
    messagingSenderId: "305498398537",
    appId: "1:305498398537:web:25838fe8d5b7dd421dc498",
    measurementId: "G-F1YWHMHVV4"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);

initializeApp(firebaseConfig);