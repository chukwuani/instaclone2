import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
	apiKey: "AIzaSyCCgg9oZaQV4MWPUY63DIp-UF40zuCY5q4",
	authDomain: "instagram-clone-d7986.firebaseapp.com",
	databaseURL: "https://instagram-clone-d7986-default-rtdb.firebaseio.com",
	projectId: "instagram-clone-d7986",
	storageBucket: "instagram-clone-d7986.appspot.com",
	messagingSenderId: "575655886253",
	appId: "1:575655886253:web:e756543f542b5cf6b03524",
	measurementId: "G-5T1SKHDWMV",
};

const app = initializeApp(firebaseConfig);
export const firestore = getFirestore(app);
export const storage = getStorage(app);
export const db = getDatabase();
