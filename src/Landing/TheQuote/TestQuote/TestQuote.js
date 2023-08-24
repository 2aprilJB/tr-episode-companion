import React from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import {useCollectionData} from 'react-firebase-hooks/firestore';

firebase.initializeApp({
    apiKey: "AIzaSyD-bRZE3M4MRdkzk99sZhnpcOxwsiIu4zA",
    authDomain: "tr-episode-companion.firebaseapp.com",
    databaseURL: "https://tr-episode-companion-default-rtdb.firebaseio.com",
    projectId: "tr-episode-companion",
    storageBucket: "tr-episode-companion.appspot.com",
    messagingSenderId: "1031772893210",
    appId: "1:1031772893210:web:b1f97437603936b1f1a1a3",
    measurementId: "G-CDT4DV7F2Y"
})
const firestore = firebase.firestore();
function TestQuote(){
    const messagesRef = firestore.collection('something@123');
    const query = messagesRef.orderBy('createdAt').limit(25);
    const [messages] = useCollectionData(query,{idField:'id'});
    return(
        <div>
            shit
            {messages && messages.map(msg=>{
                const {text,id} = msg;
                return(
                    <div key = {id}>{text}</div>
                );
            })}
        </div>
    )
}

export default TestQuote;