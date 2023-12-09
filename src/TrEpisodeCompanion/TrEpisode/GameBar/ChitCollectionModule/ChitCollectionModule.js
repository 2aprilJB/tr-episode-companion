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
        
    },[])
    
    
    return(
        <div>
            {props.display?
                <Modal2 noCross = {true} show={true}>
                    <div className="CollectedChitsModuleContainer">
                        <h3 className="ChitsCollectedHead">RIDDLES YOU COLLECTED</h3>
                        <Showcase bottom = {true}>
                        {props.collectedChits.map(ele=>{
                                let bColor;
                                if(ele[4]==='I')
                                    bColor = "#176B87";
                                else if(ele[4]==='II')
                                    bColor = "#2E4374";

                                return <CollectedChit key = {ele[1]} backColor = {bColor} chitDet = {ele}/>
                            })}
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