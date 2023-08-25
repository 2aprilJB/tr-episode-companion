import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyD-bRZE3M4MRdkzk99sZhnpcOxwsiIu4zA",
    authDomain: "tr-episode-companion.firebaseapp.com",
    databaseURL: "https://tr-episode-companion-default-rtdb.firebaseio.com",
    projectId: "tr-episode-companion",
    storageBucket: "tr-episode-companion.appspot.com",
    messagingSenderId: "1031772893210",
    appId: "1:1031772893210:web:b1f97437603936b1f1a1a3",
    measurementId: "G-CDT4DV7F2Y"
}

const app = initializeApp(firebaseConfig);
export default getFirestore();