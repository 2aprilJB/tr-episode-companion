import React from "react";
import { Polygon } from "react-leaflet";
import { useEffect } from "react";

const CharProxyFix = (props)=>{
    useEffect(()=>{
        let isIt = true;
        if(isIt){
            props.charProxyHandler(props.charArr[2],props.charArr[0]);
        }
           
    },[])         
    return <Polygon positions={props.charArr[2]} pathOptions={props.charArr[1]} />
}

export default CharProxyFix;