import React, { Component } from "react";
import axios from 'axios';
import "./HawkMode.css";
import AlertModule from "../AlertModule/AlertModule";
import PointTable from "./PointTable/PointTable";

class HawkMode extends Component{
    state = {
        credArr:[],
        charArr:[],
        submittedCode: '',
        currTeam: '',
        currChar: ''
    }

    onChitValidation(currentTeam,chitType,correctCode){
        axios.get('https://tr-episode-companion-default-rtdb.firebaseio.com/points.json')
             .then(resp=>{
                let tempPts = resp.data;
                if(correctCode&&chitType==='i'){
                    alert('Team ' + currentTeam + ' has validated Type - I, + 20pts');
                    tempPts[currentTeam] = tempPts[currentTeam] + 20;
                }
                else if(correctCode&&chitType==='ii'){
                    alert('Team ' + currentTeam + ' has validated Type - II, !!GIVE TASK!!');
                }
                else{
                    alert('Team ' + currentTeam + ' has wrong Guess, - 5pts');
                    tempPts[currentTeam] = tempPts[currentTeam] -5;
                }
                axios.put('https://tr-episode-companion-default-rtdb.firebaseio.com/points.json',tempPts)
                     .catch(err=>{
                        console.log(err);
                        alert("Network Error");
                     })
             })
    }

    onSubmitHandler(currentCode,currentSelect,currentChar){
        let codeCorrect = false;
        //We wil fetch latest data from server
        axios.get('https://tr-episode-companion-default-rtdb.firebaseio.com/.json')
             .then(resp=>{
                let charArray = resp.data.characters;
                charArray.map((elem,indA)=>{
                    if(elem[0]===currentChar){
                        elem.map((ele,indB)=>{
                            if(ele[0]===currentCode&&ele[2]===false){
                                let tempCharArr = charArray;
                                codeCorrect = true;
                                tempCharArr[indA][indB][2] = codeCorrect; //Updating state that characters's chitCode is Validated 
                                
                                axios.put('https://tr-episode-companion-default-rtdb.firebaseio.com/characters.json',tempCharArr)
                                     .then(resp=>{
                                        this.onChitValidation(currentSelect,ele[1],codeCorrect);
                                     })
                                     .catch(err=>{
                                        alert('Network Error');
                                        console.log(err);
                                     })
                                
                                this.setState({
                                    charArr: tempCharArr
                                })
                            }
                            else if(ele[0]===currentCode&&ele[2]===true){
                                codeCorrect = true;
                                alert('ChitCode already Validated')
                            }
                        })
                    }
                    else{}
                })
                if(!codeCorrect){
                    this.onChitValidation(currentSelect,'i',codeCorrect);
                }
                else{}
             })
             .catch(err=>{
                alert('Network Error');
                console.log(err);
             })
    }

    componentDidMount(){
        axios.get('https://tr-episode-companion-default-rtdb.firebaseio.com/.json')
             .then(response=>{
                let credentials = {};
                credentials = response.data.points;
                let characters = [];
                characters = response.data.characters;
                characters[0].map(ele=>{
                    if(this.props.activeChar===ele[0]){
                        this.setState({
                            currChar: ele[1]
                        })
                    }
                    else{}
                })

                this.setState({
                    credArr: credentials,
                    charArr: characters
                });
             }) //Storing Credentials
    }


    render(){
        let currentCode = null;
        let onChangeHandler = (e)=>{
            currentCode = e.target.value
        }

        let currentSelect = this.state.currTeam;
        let onSelectHandler = (e)=>{
            currentSelect = e.target.value;
            this.setState({
                currTeam: currentSelect
            })
        }
        let currentChar = this.state.currChar;
        let onCharSelectHandler = (e)=>{
            currentChar = e.target.value;
            this.setState({
                currChar: currentChar
            })
        }

        let teamOptions = Object.keys(this.state.credArr).map((ele,ind)=>{
            return(
                <option key = {ind + 65}>{ele}</option>
            )
        })
        // let charOptions = this.state.charArr.map(ele=>{
        //     return(
        //         <option key = {ele + '22'}>{ele[0]}</option>
        //     )
        // })
        let showButton = <button className="VerifyButt" onClick={()=>this.onSubmitHandler(currentCode,currentSelect,currentChar)}><ion-icon name="checkmark-done-outline" /></button>

        return(
            <div className="HawkModeContainer">
                <div className="CodeVerification">
                    <h2 className="CurrCharName">{this.state.currChar}</h2>
                    {/* Select Your Character
                    <select onChange={onCharSelectHandler} className="CharSelector">
                        {charOptions}
                    </select> */}
                    
                    <h3>Chit Code Verification</h3>
                    <select onChange={onSelectHandler} className="TeamSelector">
                        {teamOptions}
                    </select>
                    Enter Chit Code To verify
                    <input className="ChitCodeInp" type="text" onChange={onChangeHandler}></input>
                    
                    {showButton}
                </div>

                <PointTable/>
            </div>
        )
    }
}

export default HawkMode;