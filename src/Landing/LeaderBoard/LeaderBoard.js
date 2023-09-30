import React, { Component } from "react";
import "./LeaderBoard.css";

class LeaderBoard extends Component{
    state = {

    }

    render(){
        return(
            <div className="LeaderBoardMainWrapper">
                <div className="LeaderBoardHeadDet">
                    <h2 className="LeaderBoardHeadOut">OCTOBER-LEADERBOARD</h2>
                </div>

                <div className="LeaderBoardWrapper">
                    <div className="LeaderBoardHeadIn">LEADERBOARD</div>

                    <div className="LeaderBoardPlayersContainer">
                        <div className="LeaderBoardPlayerDet">
                            <div className="LeaderBoardPlayerRank">1</div>
                            <div className="LeaderBoardPlayerName"><div>Harsh</div><div className="LeaderBoardTeamCode">A001</div></div>
                            <div className="LeaderBoardPlayerCoins"><div>100</div><p className="LeaderBoardCoins">COINS</p></div>
                        </div>
                        <div className="LeaderBoardPlayerDet">
                            <div className="LeaderBoardPlayerRank">2</div>
                            <div className="LeaderBoardPlayerName"><div>GARPNO</div><div className="LeaderBoardTeamCode">A001</div></div>
                            <div className="LeaderBoardPlayerCoins"><div>101</div><p className="LeaderBoardCoins">COINS</p></div>
                        </div>
                    </div>
                    
                </div>
            </div>
        );
    }
}

export default LeaderBoard;