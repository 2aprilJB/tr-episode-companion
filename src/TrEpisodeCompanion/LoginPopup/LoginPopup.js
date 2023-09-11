import React, { Component } from "react";
import "./LoginPopup.css";
import axios from "axios";

class LoginPopup extends Component{    
    state = {
        currUser:'',
        currPass:''
    }

    componentDidMount(){
        // axios.get(this.props.credentialsUrl + '.json')
        //      .then(resp=>{
        //         this.setState({
        //             credentials: resp.data
        //         })
        //         alert(this.state.credentials);
        //      })
        //      .catch(err=>{
        //         alert('Some Network Issue');
        //         console.log(err);
        //      })
    }

    onUserChangeHandler = (e)=>{
        this.setState({
            currUser: e.target.value
        })
    }
    onPassChangeHandler = (e)=>{
        this.setState({
            currPass: e.target.value
        })
    }
    onSubmitHandler = ()=>{
        axios.get(this.props.credentialsUrl + '.json')
             .then(resp=>{
                let latestCred = resp.data;
                let tempLog = document.cookie.split(",");
                let foundIndex = null;
                console.log(this.state.currUser)
                latestCred.map((cred,credInd)=>{
                    if(cred[0] === this.state.currUser)
                        if(cred[1] === this.state.currPass){
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
                
                if(tempLog[0]===true) //If user entered correct credentials and has Logged in setting active team
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

        
        // let username = null;
        // let passcode = null;
        // let inputHandler = (e)=>{
        //     username = e.target.value;
        // };
        // let passHandler = (e)=>{
        //     passcode = e.target.value;
        // };
        return(
            <div className="LoginContainer">
                <h2 className="LoginHeading">Login</h2>
                <div className="Credential">
                    <h3 className="Username">UserName :</h3>
                    <input className="UserNameInp" type="text" onChange={this.onUserChangeHandler}></input>
                </div>
                <div className="Credential">
                    <h3 className="Passcode">Passcode :</h3>
                    <input className="PassCodeInp" type="text" onChange={this.onPassChangeHandler}></input>
                </div>
                <button className="LoginSubmit" onClick={this.onSubmitHandler}>Login</button>
            </div>
        );  
    }
}

export default LoginPopup;