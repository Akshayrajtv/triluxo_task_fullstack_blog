import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
    apiKey: "AIzaSyATHM03n0tOy7sUCrGVaAbjV4-nwp-3HQg",
    authDomain: "blog-4efc1.firebaseapp.com",
    projectId: "blog-4efc1",
    storageBucket: "blog-4efc1.appspot.com",
    messagingSenderId: "80992463560",
    appId: "1:80992463560:web:7a1049a892ba3cd06693fd",
    measurementId: "G-GK09VZ2D0B",
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app);
export const auth = getAuth();
