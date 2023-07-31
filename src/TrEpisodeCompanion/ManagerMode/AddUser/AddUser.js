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
                axios.get(this.props.baseUrl + 'credentials.json')
                    .then(resp=>{
                        let creds = resp.data;
                        creds.push(newUser);
                        axios.put(this.props.baseUrl + 'credentials.json',creds)
                            .then(resp=>{
                                alert('User Added');
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
            <div className="AddUser">
                {this.state.showUsers?<Modal show = {this.state.showUsers} onBackDrop = {()=>showUsers(false)}>
                    <ShowUsers fetchUrl = {this.props.baseUrl + 'credentials.json'} />
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