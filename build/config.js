// Import functions from firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-auth.js"
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-firestore.js"


// Firebase Config
const firebaseConfig = {
    apiKey: "AIzaSyCOHy9wXqDSe3cTOsSHgSlJQ64z2Cn-xQY",
    authDomain: "simple-blog-app-hackaton.firebaseapp.com",
    projectId: "simple-blog-app-hackaton",
    storageBucket: "simple-blog-app-hackaton.appspot.com",
    messagingSenderId: "1052449429658",
    appId: "1:1052449429658:web:4181038d007da17963a723",
    measurementId: "G-H0DB1WCHFB"
};


// Export
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);