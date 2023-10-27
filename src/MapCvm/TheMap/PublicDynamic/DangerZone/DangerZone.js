import React, { Fragment, useEffect, useState } from "react";
import { collection, doc, onSnapshot, setDoc, getDoc } from 'firebase/firestore';
import Modal2 from "../../../../Containers/Modal2/Modal2";
import { dbDynamic1 } from "../../../../firebase";
import axios from "axios";
import "./DangerZone.css";
import { isItDanger, updateDangerZone } from "../../../../FireStoreUtils/FireStoreUtils";

const DangerZone = (props)=>{
    const [showModal,setShowModal] = useState();
    let dangerZoneHandler = (count)=>{
        let isItD = false;
        isItDanger(props.activeTeam).then(res=>isItD = res.activate)
        setTimeout(()=>{
            if(isItD){
              if(count!==0){
                console.log(count);
                dangerZoneHandler(count-1);
              }
              else{
                axios.get(props.baseUrls.dynamicBase3 + '.json')
                     .then(res=>{
                        let tPts = res.data.points;
                        tPts.map(ele=>{
                            if(props.activeTeam===ele[0])
                                ele[1] = ele[1]-props.dangerMinus;
                        })
                        axios.put(props.baseUrls.dynamicBase3 + 'points.json',tPts)
                             .catch(err=>{
                                console.log(err);
                                alert("There is a Network error Please give a tight slap to th fuckin Developer")
                             })
                     })
                dangerZoneHandler(props.countDown);
              }
            }
        },1000)
      }

    useEffect(()=>{
        setShowModal(true);
        onSnapshot(collection(dbDynamic1,props.activeTeam), (snapshot)=>{        
            let itsD = snapshot.docs.map(doc=>({...doc.data(), id:doc.id}));
            if(itsD){
                if(itsD[0].activate){
                    dangerZoneHandler(props.countDown);
                }
            }
                
        })
    },[])

    if(props.activeProxyZone==='Danger' && props.secondaryProxy!=='Safe'){
        updateDangerZone(props.activeTeam,true);
    }
    else if(props.activeProxyZone==='Safe'||props.secondaryProxy==='Safe'){
        updateDangerZone(props.activeTeam,false);
    }
    return(
        <Fragment>
            {props.activeProxyZone==='Danger'?
            <Modal2 noCross = {true} show = {showModal} onBackDrop = {setShowModal}>
                <div className="DangerModalDisplay">
                <h3 className="DangerAlert"><ion-icon name="warning-outline"></ion-icon></h3> 
                <img src="https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExeXQ3ZnJ5NTZ5amtxZ2hsamc4dG02MmdhOXJjdGkzdGw1ZWQ4YmZhZSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/RiEW6mSQqjRiDy51MI/giphy.gif" alt="this slowpoke moves"  width="100%" />
                    {/* {<div>{count}</div>}
                    {setTimeout(()=>{ count = count-1 ;return <div>count-1</div>},1000)} */}
                </div>
                <div className="DangerAlertText">You are inside Red Zone Run towards safe Zone</div>
            </Modal2>:null}
        </Fragment>
    );
}

export default DangerZone;