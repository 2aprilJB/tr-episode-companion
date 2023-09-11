import React, { Component } from "react";
import "./AlertModule.css";
import { collection, doc, onSnapshot, setDoc, getDoc } from 'firebase/firestore';
import {dbStatic}from '../../firebase';
import { useEffect, useState } from 'react';
import Modal from "../../Containers/Modal/Modal";

const AlertModule = ()=>{
    const [alertMsg,setAlertMsg] = useState();
    const [showModal,setShowModal] = useState();

    useEffect(()=>{
        onSnapshot(collection(dbStatic,"TRalerts"), (snapshot)=>{
            setAlertMsg(snapshot.docs.map(doc=>({...doc.data(), id:doc.id})));
            setShowModal(true);
        })
    },[])
    return(
        <div>
            {alertMsg?
            <Modal show={showModal} onBackDrop = {()=>setShowModal(false)}>
                {alertMsg[0].message}
            </Modal>:null}
        </div>
    );
}

export default AlertModule;