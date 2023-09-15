import React, { Component } from "react";
import "./ActualChit.css";
import axios from "axios";
import { toBeRequired } from "@testing-library/jest-dom/matchers";

class ActualChit extends Component{
    state = {
        theRiddle: '',
        riddleCode: '',
        chitsFinished: false
    }
    componentDidMount(){
        axios.get(this.props.baseUrl + 'chits/' + this.props.chitType + '.json')
            .then(response=>{
                let chits = response.data;
                if(chits[0][2]==='Z')
                {
                    this.setState({
                        theRiddle: chits[0][0],
                        riddleCode: chits[0][1]
                    });
                    chits[0][2] = this.props.activeTeam;
                    let tempChit = chits[0];
                    chits.shift();
                    chits.push(tempChit);
                    axios.put(this.props.baseUrl + 'chits/' + this.props.chitType + '.json',chits)
                        .catch(err=>{
                            alert('Network error, Contact Desk');
                        })
                }
                else{
                    this.setState({
                        chitsFinished:true
                    })
                }
            })
    }
    render(){
        return(
            <div className="ActualChitContainer">
                <div className="TrLogo">TR</div>
                <div className="Riddle">
                    {this.state.chitsFinished?<div>Sorry These Type of chits are finished</div>:this.state.theRiddle}
                </div>
                <div className="ChitCode">{this.state.riddleCode}</div>
            </div>
        );
    }
}

export default ActualChit;