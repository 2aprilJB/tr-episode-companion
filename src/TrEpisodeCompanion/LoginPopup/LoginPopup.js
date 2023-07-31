import React, { Component } from "react";
import "./LoginPopup.css";
import axios from "axios";

class LoginPopup extends Component{    
    state = {
        credentials: [],
    }

    componentDidMount(){
        axios.get(this.props.credentialsUrl + '.json')
             .then(resp=>{
                this.setState({
                    credentials: resp.data
                })
             })
             .catch(err=>{
                alert('Some Network Issue');
                console.log(err);
             })
    }
    onSubmitHandler = (userName,passCode)=>{
        axios.get(this.props.credentialsUrl + '.json')
             .then(resp=>{
                let latestCred = resp.data;
                let tempLog = this.props.loggedIn;
                let foundIndex = null;
                latestCred.map((cred,credInd)=>{
                    if(cred[0] === userName)
                        if(cred[1] === passCode){
                            tempLog = [!cred[2],cred[3]];
                            foundIndex = credInd;
                        }
                        else
                            {}
                        else
                            {}
                    
                });
                let tempCred = null;
                if(foundIndex!==null){
                    tempCred = latestCred[foundIndex];
                    tempCred[2] = true;
                    axios.put(this.props.credentialsUrl + '/' + foundIndex + '.json',tempCred)
                    .catch(err=>{
                        alert("Network Error");
                    })
                }
                else{}
                
                if(tempLog[0]) //If user entered correct credentials and has Logged in setting active team
                    {
                        this.props.loggedInHandler(tempLog);
                        document.cookie = tempLog;
                        let activeTeam = tempLog[1]; //Here we are uppercasing username then splitting to get last letter in uppercase
                        alert('You have logged in as Team: ' + activeTeam);
                    }
                else if(foundIndex===null)
                    alert('Username or Passcode is Wrong');
                else{
                    alert('User Already Logged In');
                }
             })
             .catch(err=>{
                alert('Network Error');
                console.log(err);
             })
        
    }
    
    render(){

        let username = null;
        let passcode = null;
        let inputHandler = (e)=>{
            username = e.target.value;
        };
        let passHandler = (e)=>{
            passcode = e.target.value;
        };
        return(
            <div className="LoginContainer">
                <h2 className="LoginHeading">Login</h2>
                <div className="Credential">
                    <h3 className="Username">UserName :</h3>
                    <input className="UserNameInp" type="text" onChange={inputHandler}></input>
                </div>
                <div className="Credential">
                    <h3 className="Passcode">Passcode :</h3>
                    <input className="PassCodeInp" type="text" onChange={passHandler}></input>
                </div>
                <button className="LoginSubmit" onClick={()=>this.onSubmitHandler(username,passcode)}>Login</button>
            </div>
        );  
    }
}

export default LoginPopup;