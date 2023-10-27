import React, { Component } from "react";
import axios from 'axios';
import "./HawkMode.css";
import AlertModule from "../AlertModule/AlertModule";
import PointTable from "./PointTable/PointTable";

//Takes following props:-
//---activeChar , if you pass null will let you select characters
//---activeTeam , if you pass null will let you select teams
//---baseUrl , with dynamicBase3 , a Must without this props, this whole component won't work

class HawkMode extends Component{
    state = {
        credArr:[],
        charArr:[],
        submittedCode: '',
        currTeam: '',
        currChar: '',
        showButton: true,
        currCode: ''
    }

    onChitValidation(currentTeam,chitType,correctCode){
        axios.get(this.props.baseUrl.dynamicBase3 + 'points.json')
             .then(resp=>{
                let tempPts = resp.data;
                let indOTeam = 0;
                tempPts.map((ele,ind)=>{
                    if(ele[0]===currentTeam){
                        indOTeam = ind;
                    }
                    else{}
                })
                // let currTeamIndex = currTeamPtsIndex();
                if(correctCode&&chitType==='i'){
                    alert('Team ' + currentTeam + ' has validated Type - I, + 20pts');
                    tempPts[indOTeam][1] = tempPts[indOTeam][1] + 20;
                }
                else if(correctCode&&chitType==='ii'){
                    alert('Team ' + currentTeam + ' has validated Type - II, + 50pts');
                    tempPts[indOTeam][1] = tempPts[indOTeam][1] + 50;
                }
                else{
                    alert('Team ' + currentTeam + ' has wrong Guess, - 5pts');
                    tempPts[indOTeam][1] = tempPts[indOTeam][1] -5;
                }
                axios.put(this.props.baseUrl.dynamicBase3 + 'points.json',tempPts)
                     .then(resp=>{
                        // console.log(tempPts)
                        this.setState({
                            showButton: true
                        })
                     })
                     .catch(err=>{
                        console.log(err);
                        alert("Network Error");
                     })
             })
    }

    onSubmitHandler(currentCode,currentSelect,currentChar){
        let codeCorrect = false;
        this.setState({
            showButton:false
        })
        //We wil fetch latest data from server
        axios.get(this.props.baseUrl.dynamicBase2 + '.json')
             .then(resp=>{
                let charArray = resp.data.characters;
                charArray.map((elem,indA)=>{
                    if(elem[0]===currentChar){
                        elem.map((ele,indB)=>{
                            if(ele[0]===currentCode&&ele[2]===false){
                                let tempCharArr = charArray;
                                codeCorrect = true;
                                tempCharArr[indA][indB][2] = codeCorrect; //Updating state that characters's chitCode is Validated 
                                
                                axios.put(this.props.baseUrl.dynamicBase2 + 'characters.json',tempCharArr)
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
                                alert('ChitCode already Validated');
                                this.setState({
                                    showButton:true
                                })
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

        if(this.props.activeTeam){
            this.setState({
                currTeam: this.props.activeTeam
            })
        }
        else{}

        let trueActiveChar = '';
        let onlyCode = this.props.activeChar?this.props.activeChar.split('')[1]:null;

        axios.get(this.props.baseUrl.dynamicBase3 + '.json')
             .then(response=>{
                let credentials = {};
                credentials = response.data.points;
                
                axios.get(this.props.baseUrl.dynamicBase2 + '.json')  
                     .then(resp=>{
                        let characters = [];
                        characters = resp.data.characters;
                        if(this.props.activeChar.length===2){
                            trueActiveChar = characters[0][onlyCode];
                        }
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
                     })
                     .catch(err=>{
                        console.log(err);
                        alert("There's Network Error");
                     })
             }) //Storing Credentials
             .catch(err=>{
                console.log(err);
                alert("There's Network Error");
             })
    }


    render(){
        let onChangeHandler = (e)=>{
            this.setState({
                currCode: e.target.value
            })
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

        let teamOptions = this.state.credArr.map((ele,ind)=>{
            return(
                <option key = {ind + 65}>{ele}</option>
            )
        })
        let charOptions = this.state.charArr.map(ele=>{
            return(
                <option key = {ele + '22'}>{ele[0]}</option>
            )
        })
        let showButton = this.state.showButton?<button className="VerifyButt" onClick={()=>this.onSubmitHandler(this.state.currCode,currentSelect,currentChar)}><ion-icon name="checkmark-done-outline" /></button>:null;

        return(
            <div className="HawkModeContainer">
                <div className="CodeVerification">
                    <h2 className="CurrCharName">{this.state.currChar}</h2>
                    {!this.props.activeChar?<div>
                    Select Your Character
                    <select onChange={onCharSelectHandler} className="CharSelector">
                        {charOptions}
                    </select></div>:null}
                    
                    <h3>Riddle Code Verification</h3>
                    <h2 className="CurrCharName">{this.state.currTeam}</h2>
                    {!this.props.activeTeam?<select onChange={onSelectHandler} className="TeamSelector">
                        {teamOptions}
                    </select>:null}
                    Enter Riddle Code To verify
                    <input className="ChitCodeInp" type="text" onChange={onChangeHandler}></input>
                    
                    {showButton}
                </div>

                {this.props.onProximity?<PointTable baseUrl = {this.props.baseUrl} />:null}
            </div>
        )
    }
}

export default HawkMode;