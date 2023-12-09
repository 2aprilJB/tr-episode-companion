import React, { Component } from "react";
import "./UpdateCoins.css";
import EnterData from "../AddUser/EnterData/EnterData";
import axios from "axios";

class UpdateCoins extends Component{
    state={
        currTeamCode: '',
        currAddSubVal: 0 
    }
    componentDidMount(){
        axios.get(this.props.baseUrl.dynamicBase3 + '.json')
             .then(resp=>{
                this.setState({
                    credsArr: resp.data.points
                })
             })
             .catch(err=>{
                console.log(err);
                alert('There is a network error big enough to get everyone a tight thwappp!!');
             })
    }
    
    render(){
        let onTeamCodeSelectHandler = (e)=>{
            this.setState({
                currTeamCode: e.target.value
            })
        }
        let onChangeHandler = (e)=>{
            this.setState({
                currAddSubVal: Number(e.target.value)
            })
        }
        let onSubmitHandler = ()=>{
            let urlPC = this.props.baseUrl.dynamicBase4 + 'backUpTrCoins';
            if(this.props.updatePointsInsteadCoins){
                urlPC = this.props.baseUrl.dynamicBase3 + 'points'
            }
            else{}
            if(window.confirm('You sure want to add/Subtract')){
                axios.get(urlPC + '.json')
                 .then(resp=>{
                    if(resp.data)
                    resp.data.map((ele,ind)=>{
                        if(ele[0]===this.state.currTeamCode){
                            let updatedCoins = this.state.currAddSubVal + ele[1]

                            axios.put(urlPC + '/' + ind +'.json',[ele[0],updatedCoins])
                                 .catch(err=>{
                                    console.log(err);
                                    alert('There is a Network Error that is unbelievable')
                                 })

                        }
                        else{
                        }
                    })
                    else{}
                 })
                 .catch(err=>{
                    console.log(err);
                    alert("Here comes the ultimate crappy error!! YIKESSS");
                 })
            }
            else{}
        }
        return(
            <div className="AddWrapper">
                <h4>Update Coins</h4>
                <select onChange={onTeamCodeSelectHandler} className="CharSelector">
                    <option>Select Team</option>
                    {this.state.credsArr?this.state.credsArr.map((ele,ind)=>{
                        return(
                            <option key={ind + 65} >{ele[0]}</option>
                        );
                    }):null}
                </select>
                <h3>Enter how Many add/substract</h3>
                <EnterData inpType = {'number'} onChangeHandler = {onChangeHandler} enterWhat = "Add or Sub Value"/>
                <button className="SubmitUser" onClick={onSubmitHandler}><ion-icon name="caret-forward-outline"></ion-icon></button>
            </div>
        );
    }
}

export default UpdateCoins;