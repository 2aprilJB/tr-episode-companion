import React, { useEffect, useState } from "react";
import "./ChitCollectionModule.css";
import axios from "axios";
import Modal2 from "../../../../Containers/Modal2/Modal2";
import Showcase from "../../../../Containers/Showcase/Showcase";
import CollectedChit from "./CollectedChit/CollectedChit";

const ChitCollectionModule = (props)=>{
    const [allRiddles,setAllRiddles] = useState();
    const [collectedRiddles,setCollectedRiddles] = useState();
    useEffect(()=>{
        axios.get(props.baseUrl.dynamicBase2 + '.json')
             .then(resp=>{
                setAllRiddles(resp.data.chits);
             })
             .catch(err=>{
                console.log(err);
                alert("There's Some Serious Network Crap Goin Arround,Nigerrro!!");
             })
    },[])
    let collectedRiddlesByTeam = [];
    if(allRiddles){
        
        allRiddles.i.map(ele=>{
            if(ele[2]===props.activeTeam){
                ele.push('I');
                collectedRiddlesByTeam.push(ele);
            }
        })
        allRiddles.ii.map(ele=>{
            if(ele[2]===props.activeTeam){
                ele.push('II');
                collectedRiddlesByTeam.push(ele);
            }
        })
    }
    return(
        <div>
            {props.display?
                <Modal2 noCross = {true} show={true}>
                    <div className="CollectedChitsModuleContainer">
                        <h3 className="ChitsCollectedHead">RIDDLES YOU COLLECTED</h3>
                        <Showcase bottom = {true}>
                            {collectedRiddlesByTeam?collectedRiddlesByTeam.map(ele=>{
                                let bColor;
                                if(ele[4]==='I')
                                    bColor = "#176B87";
                                else if(ele[4]==='II')
                                    bColor = "#2E4374";
                                return (<CollectedChit key = {ele[1]} backColor = {bColor} chitDet = {ele}/>)
                            }):<CollectedChit backColor = "#2E4374"/>}
                            
                        </Showcase>
                    </div>
                </Modal2>
            :null}
        </div>
    )
}

export default ChitCollectionModule;

// return 
//                                 else{}
//                             }):null}
//                             {allRiddles?allRiddles.ii.map(ele=>{
//                                 if(ele[2]===props.activeTeam)
//                                     return <CollectedChit backColor = "#2E4374" chitDet = {ele}/>