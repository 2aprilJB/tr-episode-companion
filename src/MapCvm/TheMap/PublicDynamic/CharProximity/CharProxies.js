import React, { Component, useEffect, useState } from "react";
import "./CharProxies.css";
import Modal from "../../../../Containers/Modal/Modal";
import axios from "axios";
import { Polygon } from "react-leaflet";
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
        axios.get(this.props.baseUrl + '.json')
             .then(resp=>{
                this.setState({
                    charArr: resp.data.polygons.charProxies,
                })
                
             })
             .catch(err=>{
                console.log(err);
                alert("Some network Error persists");
             })
    }
    render(){
        return(
            <div>
                {this.state.charArr?this.state.charArr.map((ele,ind)=>{
                    return <Polygon key={ind} positions={ele[2]} pathOptions={ele[1]} />
                }):null}
            </div>
        );
    }
    
}

export default CharProxies;