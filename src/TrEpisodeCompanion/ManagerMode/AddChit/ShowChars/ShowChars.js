import React from "react";
import axios from "axios";
import "./ShowChars.css";
import { Component } from "react";

class ShowChars extends Component{
    state = {
        chars: []
    }

    componentDidMount(){
        axios.get(this.props.fetchUrl + '.json')
         .then(resp=>{
            this.setState({
                chars: resp.data
            })
         })
         .catch(err=>{
            console.log(err);
            alert('There is some error with the network please report to the desk')
         })
    }

    render(){
        return(
            <div className="ShowCharsContainer">
                {this.state.chars.map((elem,index)=>{
                    if(index>0){
                        return(
                            <div key={index + ' Container'} className="CharContainer">
                                <h4 className="CharName">{elem[0]}</h4>
                                {elem.map((ele,ind)=>{
                                    if(ind>0)
                                        return(
                                            <div key = {ele + ind}>{ele[0] + ' ' + ele[1] + ' ' + ele[2]}</div>
                                        );
                                    else{}
                                })}
                            </div>
                        )    
                    }
                })}
            </div>
        )
    }
}

export default ShowChars;