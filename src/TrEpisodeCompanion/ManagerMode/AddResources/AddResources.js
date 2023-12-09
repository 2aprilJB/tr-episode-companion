import React, { Component } from "react";
import "./AddResources.css";
import axios from "axios";
import EnterData from "../AddUser/EnterData/EnterData";

//In upcoming future if this code is read again there would be this crappy confusion between, "saying","alerts","possible answers" they all are same

class AddResources extends Component{
    state = {
        resources: [],
        showAdd: false,
        currValue : {
            currSaying:'',
            currActiveTeams:''
        },
        currSubject:''
    }
    componentDidMount(){
        axios.get(this.props.baseUrl.staticBase + 'resources.json')
             .then(resp=>{
                this.setState({
                    resources: resp.data
                })
             })
             .catch(err=>{
                console.log(err);
                alert("There is some seroius network error on the way..Hey Morty its me...brrrp i'm stuckkk");
             })
    }
    render(){
        let ts = this.state;
        let res = ts.resources;
        let onShowClick = ()=>{
            this.setState({
                showAdd: !this.state.showAdd
            })
        }
        let onSubmit = ()=>{
            if(window.confirm("Are You sure?")){
                res.map((ele,ind)=>{
                    if(ele.subject===ts.currSubject){
                        let alerts = [];
                        let newAlertInfo = {info:ts.currValue.currSaying}
                        if(ele.alerts){             //If there's any other alert/Sayinh already there
                            alerts = ele.alerts;
                            alerts.push(newAlertInfo)
                        }
                        else{
                            alerts = [newAlertInfo];
                        }
                        alert("Wait till updation is completed")
                        axios.put(this.props.baseUrl.staticBase + 'resources/' + ind + '/alerts.json',alerts)
                            .then(resp=>{
                                alert("Updated!!")
                            })
                            .catch(err=>{
                                console.log(err);
                                alert("There is some seroius network error on the way..Hey Morty its me...brrrp i'm stuckkk");
                            })
                    }
                })
            }
        }
        let onActiveUserListSubmit = ()=>{
            if(window.confirm("Are you Sure to submit this list")){
                let list = ['blank',...this.state.currValue.currActiveTeams.split(",")];
                axios.put(this.props.baseUrl.dynamicBase3 + 'activeCreds.json',list)
                    .catch(err=>{
                        console.log(err);
                        alert("There's an Error going to disrupt today's events so brace yourself, and Amen to my dear Developer");
                    })
            }
            else{}
        }
        let onSubjectSelect = (e)=>{
            this.setState({
                currSubject: e.target.value
            })
        }
        let onInpChangeHandler = (e,currVal,currValueInd)=>{
            currVal = e.target.value;
            let prevVal = this.state.currValue;
            prevVal[currValueInd] = currVal
            this.setState({
                currValue: prevVal
            })
        }
        return(
            <div className="AddResourcesContainer">
                <button style={{color:"skyblue",borderRadius:"10px",border:"2px solid black"}} className = {"DangerButt"} onClick={onShowClick}><ion-icon name="book-outline"></ion-icon></button>

                {this.state.showAdd?
                    <div>
                        <div className="AddWrapper">
                            <select defaultValue={"Select Subject"} onChange={onSubjectSelect}>
                                <option>Select Subject</option>
                                {res?res.map((ele,ind)=>{
                                    return <option key = {ind + "ResSub"}>{ele.subject}</option>
                                }):null}
                            </select>
                            <EnterData onChangeHandler = {onInpChangeHandler} currValIn = {'currSaying'} currValue = {this.state.currValue.currSaying} enterWhat = "Possible Saying:" />
                            <button className="SubmitUser" onClick = {onSubmit}><ion-icon name="caret-forward-outline"></ion-icon></button>
                        </div>
                        <div className="AddWrapper">
                            <EnterData onChangeHandler = {onInpChangeHandler} currValIn = {'currActiveTeams'} currValue = {this.state.currValue.currActiveTeams} enterWhat = "All Active Teams with ',' and no spaces:" />
                            <button className="SubmitUser" onClick = {onActiveUserListSubmit}><ion-icon name="caret-forward-outline"></ion-icon></button>
                        </div>
                    </div>
                :null}
            </div>
        );
    }
}

export default AddResources;