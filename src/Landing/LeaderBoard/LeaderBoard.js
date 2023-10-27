import React, { Component } from "react";
import "./LeaderBoard.css";
import axios from "axios";

class LeaderBoard extends Component{
    state = {
        sortedPts: []
    }
    componentDidMount(){
        axios.get(this.props.baseUrl)
            .then(resp=>{
                let sorting = resp.data.sort(function(a, b) { return b[1] - a[1]; });
                this.setState({
                    sortedPts: sorting
                })
            })
            .catch(err=>{
                console.log(err);
                alert("Network error is there and bare with us !! ");
            })                     
    }
    render(){
        let srtPts = this.state.sortedPts;
        let bonIcon = <ion-icon name="bonfire-outline"></ion-icon>;
        return(
            <div className="LeaderBoardMainWrapper">
                <div className="LeaderBoardHeadDet">
                    <h2 className="LeaderBoardHeadOut">{bonIcon} {this.props.leaderBoardName} {bonIcon}</h2>
                </div>

                <div className="LeaderBoardWrapper">
                    <div className="LeaderBoardHeadIn">LEADERBOARD</div>

                    <div className="LeaderBoardPlayersContainer">
                        {
                            srtPts?srtPts.map((ele,ind)=>{
                                return(
                                    <div key={ind + 'PlayerDet'} className="LeaderBoardPlayerDet">
                                        <div className="LeaderBoardPlayerRank">{ind+1}</div>
                                        <div className="LeaderBoardPlayerName"><div>{ele[3]?ele[3]:ele[0]}</div><div className="LeaderBoardTeamCode">{ele[0]}</div></div>
                                        <div className="LeaderBoardPlayerCoins"><div>{ele[1]}</div><p className="LeaderBoardCoins">{this.props.ptsOcoins}</p></div>
                                    </div>
                                );
                            }):null
                        }
                    </div>
                    
                </div>
            </div>
        );
    }
}

export default LeaderBoard;