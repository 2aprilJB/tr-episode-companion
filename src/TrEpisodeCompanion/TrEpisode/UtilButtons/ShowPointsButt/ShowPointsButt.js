import React, { Component} from "react";
import "./ShowPointsButt.css";
import UtilsButtBanner from "../../../../Assets/Images/utilButtonBanner.png";
import Modal from "../../../../Containers/Modal/Modal";
import LeaderBoard from "../../../../Landing/LeaderBoard/LeaderBoard";
import axios from "axios";
import TeamBanner from '../../../../Assets/Images/teamBanner.png'

class ShowPointsButt extends Component{
    state = {
        show: false,
        activePts: 0
    }

    componentDidMount(){
        
    }
    setShow = (tOf)=>{
        this.setState({
            show :tOf
        })
    }
    setActivePts = ()=>{
        axios.get(this.props.baseUrl.dynamicBase3 + '/points.json')
        .then(resp=>{
           resp.data.map(ele=>{
               if(ele[0]===this.props.activeTeam){
                   this.setState({
                    activePts: ele[1]
                   })
                    this.setShow(true);

               }
               else{}
           })
           
        })
        .catch(err=>{
           console.log(err);
           alert("Uff Ye Network errors");
        })
    }
    render(){
        return(
            <div className="ShowPointsContainer">
                <img className="UtilsButt" src={UtilsButtBanner}></img>
                <div onClick={this.setActivePts} className="ShowPoints">
                    <ion-icon name="checkmark-done-circle-outline"></ion-icon>
                </div>
                <Modal show = {this.state.show} onBackDrop = {()=>this.setShow(false)}>
                    <div style={{width: "100%"}}>
                        <LeaderBoard leaderBoardName = {"POINTS RANKINGS"} ptsOcoins = {"pts"} baseUrl = {this.props.baseUrl.dynamicBase3 + 'points.json'} />
                    </div>
                    {/* Displaying Current Active Team's Points */}
                    <div className="TeamDetails">
                        <img className="TeamBanner" src={TeamBanner}></img>
                        <h5>YOUR SCORE</h5>
                        <h3 className="TeamCode">{this.state.activePts}</h3>
                    </div>
                </Modal>
                <h3 className="ButtText">Show<br/>Points</h3>
            </div>
        );
    }
}

export default ShowPointsButt;