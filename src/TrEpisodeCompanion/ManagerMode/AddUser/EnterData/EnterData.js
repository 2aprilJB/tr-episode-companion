import React, { Component } from "react";
import "./EnterData.css";

class EnterData extends Component{
    render(){
        let inpType = this.props.inpType !== "text"?this.props.inpType:"text";
        return(
            <div className="EnterContainer">
                <h4 className="EnterHead">{this.props.enterWhat}:</h4>
                <input className="EnterText" onChange={(e)=>this.props.onChangeHandler(e,this.props.currValue,this.props.currValIn)} type={inpType}></input>
            </div>
        )
    }
}

export default EnterData;