import React, { Component } from "react";
import "./AddUser.css";
import EnterData from "./EnterData/EnterData";
import axios from "axios";
import ShowUsers from "./ShowUsers/ShowUsers";
import Modal from "../../../Containers/Modal/Modal";

class AddUser extends Component{
    state = {
        showUsers: false,
        modalContent:[],
        currValue : {
            currUser:'',
            currPass:'',
            currTeamCode:''
        }
    }

    
    render(){
        let onShowUsers = ()=>{
            showUsers(true);
        }
        let onClickHandler = ()=>{
            let newUser = this.state.currValue;
            newUser = [newUser.currUser,newUser.currPass,false,newUser.currTeamCode];
            if(window.confirm("Are You Sure to Add this USER??"))
                axios.get(this.props.baseUrl.dynamicBase3 + 'credentials.json')
                    .then(resp=>{
                        let creds = resp.data;
                        creds.push(newUser);
                        axios.put(this.props.baseUrl.dynamicBase3 + 'credentials.json',creds)
                            .then(resp=>{
                                alert('User Added');
                                axios.get(this.props.baseUrl.dynamicBase4 + 'backUpTrCoins.json')
                                     .then(resp=>{
                                        let tempTrC = resp.data;
                                        tempTrC.push([this.state.currValue.currTeamCode,0]);
                                        axios.put(this.props.baseUrl.dynamicBase4 + 'backUpTrCoins.json',tempTrC)
                                             .catch(err=>{
                                                console.log(err);
                                                alert('There is another network eror that can be only be solved by the might of INTERNET');
                                             })
                                        axios.put(this.props.baseUrl.dynamicBase3 + 'points.json',tempTrC)
                                             .catch(err=>{
                                               console.log(err);
                                               alert('There is another Network Error you Moronic Developer')
                                        })

                                     })
                                     .catch(err=>{
                                        console.log(err);
                                        alert('There is another network eror that can be only be solved by the might of INTERNET');
                                     })
                            })
                            .catch(err=>{
                                alert('Network Issue');
                                console.log(err);
                            })
                    })
                    .catch(err=>{
                        alert('Network Issue');
                        console.log(err);
                    })
            else{}
        }
        
        let onUserChangeHandler = (e,currVal,currValueInd)=>{
            currVal = e.target.value;
            let prevVal = this.state.currValue;
            prevVal[currValueInd] = currVal
            this.setState({
                currValue: prevVal
            })
        }
        let showUsers = (showOrNot)=>{
            this.setState({
                showUsers:showOrNot
            })
        }
        return(
            <div className="AddWrapper">
                {this.state.showUsers?<Modal show = {this.state.showUsers} onBackDrop = {()=>showUsers(false)}>
                    <ShowUsers fetchUrl = {this.props.baseUrl.dynamicBase3 + 'credentials.json'} />
                </Modal>:null}
                <button onClick={onShowUsers} className="ShowButt"><ion-icon name="bonfire-outline"></ion-icon></button>

                <h4 className="AddUserHead">Add User</h4>
                <EnterData onChangeHandler = {onUserChangeHandler} currValIn = {'currUser'} currValue = {this.state.currValue.currUser} enterWhat = "UserName"/>
                <EnterData onChangeHandler = {onUserChangeHandler} currValIn = {'currPass'} currValue = {this.state.currValue.currPass} enterWhat = "PassCode"/>
                <EnterData onChangeHandler = {onUserChangeHandler} currValIn = {'currTeamCode'} currValue = {this.state.currValue.currTeamCode} enterWhat = "TeamCode"/>
                <button className="SubmitUser" onClick={onClickHandler}><ion-icon name="caret-forward-outline"></ion-icon></button>
            </div>
        );
    }
}

export default AddUser;