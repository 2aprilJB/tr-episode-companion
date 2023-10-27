import React, { Component, useEffect, useState } from "react";
import "./CharProxies.css";
import Modal from "../../../../Containers/Modal/Modal";
import axios from "axios";
import { Circle, Marker} from "react-leaflet";
import {  iconRShop,iconPerson, iconChar,iconChar1,iconChar2,iconChar3,iconChar4,iconChar5,iconKiller1,iconKiller2,iconWaterBall,iconManager, iconSpecial  } from '../../Icon/Icon';
import { isMarkerInsidePolygon } from "../../DynamicMarker/DynamicMarker";

class CharProxies extends Component{
    state = {
        charArr:[]
    }
    
    componentDidMount(){
        // let coords = [[23.22229,72.65015],[23.22218,72.65001],[23.22231,72.6499],[23.22244,72.65006]];
        // axios.put(this.props.baseUrl + '/polygons/charProxies/2/2.json',coords)
        //      .catch(err=>{
        //         console.log(err);
        //         alert('There is another Network Error');
        //      })
        
        this.setState({
            charArr: this.props.polyCoords.charProxies
        })
    }
    render(){
        return(
            <div>
                {this.props.polyCoords.charProxies?this.props.polyCoords.charProxies.map((ele,ind)=>{
                    let colorDef = "blue";
                    let centreMarkerIcon = iconChar; //For Default if no Char Code is there
                    if(ele[0]==='Z1'){
                        centreMarkerIcon = iconChar1;
                    }
                    else if(ele[0]==='Z2'){
                        centreMarkerIcon = iconChar2;
                    }
                    else if(ele[0]==='Z3'){
                        centreMarkerIcon = iconChar3;
                    }
                    else if(ele[0]==='Z4'){
                        centreMarkerIcon = iconChar4;
                    }
                    else if(ele[0]==='Z5'){
                        centreMarkerIcon = iconChar5;
                    }
                    else if(ele[0]==='Z6'){
                        centreMarkerIcon = iconKiller1;
                    }
                    else if(ele[0]==='Z7'){
                        centreMarkerIcon = iconKiller2;
                    }
                    else if(ele[0]==='ZW'){
                        centreMarkerIcon = iconWaterBall;
                    }
                    else if(ele[0]==='ZRS'){
                        centreMarkerIcon = iconRShop;
                    }
                    else if(ele[0].length>3){
                        centreMarkerIcon = null;
                    }
                    else{}

                    if(ele[1].boundColor){
                        colorDef = ele[1].boundColor;
                    }
                    else{}
                    return <div key={ind}>
                        <Circle weight={ele[1].weight} radius={ele[1].radius} fillColor={ele[1].color} color={colorDef} center={ele[2]} />
                        {centreMarkerIcon?<Marker key={ind + 'CenterMarker'} position={ele[2]} icon={centreMarkerIcon}/>:null}
                    </div>
                }):null}
            </div>
        );
    }
    
}

export default CharProxies;