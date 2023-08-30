import "./AlertMsgPopUp.css";
import { collection, getDoc, onSnapshot,doc } from 'firebase/firestore';
import db from '../../firebase';
import { useEffect, useState } from 'react';

const AlertMsgPopUp = async()=>{
    const [alertMsg,setAlertMsg] = useState();
    
    useEffect=(()=>{
        onSnapshot(collection(db,"TRalerts"), (snapshot)=>{
            setAlertMsg(snapshot.docs.map(doc=>({...doc.data()})));
        });
        console.log(alertMsg);
    },[])
    return(<div>s</div>);
}

export default AlertMsgPopUp;