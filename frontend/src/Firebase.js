import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";

const firebaseConfig = {
        apiKey: "AIzaSyDCH29OqUXFIgWabGmKLXH9vM7rmywf6e0",
        authDomain: "online-courses-70e4f.firebaseapp.com",
        projectId: "online-courses-70e4f",
        storageBucket: "online-courses-70e4f.appspot.com",
        messagingSenderId: "987550376400",
        appId: "1:987550376400:web:20145bd947df33d71bd9d5",
        measurementId: "G-9L8C57LVFT"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);