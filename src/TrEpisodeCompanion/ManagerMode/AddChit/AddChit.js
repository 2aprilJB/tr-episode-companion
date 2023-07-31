import React, { Component } from "react";
import "./AddChit.css";
import EnterData from "../AddUser/EnterData/EnterData";
import axios from "axios";
import Modal from "../../../Containers/Modal/Modal";
import Showcase2 from "../../../Containers/Showcase2/Showcase2";
import ShowChits from "./ShowChits/ShowChits";
import ShowChars from "./ShowChars/ShowChars";

class AddChit extends Component{
    state={
        showChits: false,
        currValue:{
            currType: 'i',
            currChar: '',
            currRid: '',
            currCode: ''
        }
    }
    onChangeHandler = (e,currVal,an)=>{
        let tempVal = this.state.currValue;
        if(currVal==='Char'){
            tempVal.currChar = e.target.value;
        }
        else if(currVal==='Rid')
            tempVal.currRid = e.target.value;
        else if(currVal==='Code')
            tempVal.currCode = e.target.value;
        else if(currVal==='Type'){
            tempVal.currType = e.target.value; }
        else{}

        this.setState({
            currValue:tempVal
        })
    }

    onClickHandler = ()=>{
        if(window.confirm('Are you sure you want to add this chit??')){
            axios.get(this.props.baseUrl + '.json')
            .then(resp=>{
                let currVal = this.state.currValue;
                let temp = resp.data;
                let isItNewChar = true;
                let newChit = [currVal.currRid,currVal.currCode,"Z",false];
                let newCharRidd = [currVal.currCode,currVal.currType,false];
                temp.chits[currVal.currType].unshift(newChit); //Adding Chit to its type's array at the begining

                temp.characters.map((ele,ind)=>{
                    if(ele[0]===currVal.currChar){
                        temp.characters[ind].push(newCharRidd);
                        isItNewChar = false;
                    }
                    else{}
                })
                if(isItNewChar){
                    temp.characters.push([currVal.currChar,newCharRidd]);
                }
                axios.put(this.props.baseUrl + '.json',temp)
                    .catch(err=>{
                        console.log(err);
                        alert('Some Network Issue');
                    })
            })
            .catch(err=>{
                console.log(err);
                alert('Some Network Issue');
            })
        }
        else{}
    }
    render(){
        let onShowChits = ()=>{
            showChits(true);
        }
        let showChits = (showOrNot)=>{
            this.setState({
                showChits:showOrNot
            })
        }
        return(
            <div className="AddChitWrapper">
                {this.state.showChits?<Modal show = {this.state.showChits} onBackDrop = {()=>showChits(false)}>
                    <Showcase2 colors = {['#c70039','#1eb2a6']} activeSub = {2} modules = {["Riddles", "Characters"]}>
                        <ShowChits fetchUrl = {this.props.baseUrl + 'chits'} fetchCharUrl = {this.props.baseUrl + 'characters'} />
                        <ShowChars fetchUrl = {this.props.baseUrl + 'characters'} />
                    </Showcase2>
                </Modal>:null}
                <button onClick={onShowChits} className="ShowButt"><ion-icon name="bonfire-outline"></ion-icon></button>

                <h4 className="AddChitHead">ADD CHIT</h4>
                <div className="ChitTypeSelect">
                    <h4>Select Chit Type</h4>
                    <select onChange={(e)=>this.onChangeHandler(e,'Type')}>
                        <option>i</option>
                        <option>ii</option>
                    </select>
                </div>
                <EnterData enterWhat = {'Character'} currValue = {'Char'} onChangeHandler = {this.onChangeHandler} />
                <EnterData enterWhat = {'Riddle'} currValue = {'Rid'} onChangeHandler = {this.onChangeHandler} />
                <EnterData enterWhat = {'Code'} currValue = {'Code'} onChangeHandler = {this.onChangeHandler} />
                <button className="SubmitChit" onClick={this.onClickHandler}><ion-icon name="caret-forward-outline"></ion-icon></button>
            </div>
        );
    }
}

export default AddChit;