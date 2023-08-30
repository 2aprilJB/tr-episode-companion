import React from "react";
import "./UseCoins.css";
import { updateCoins } from "../../../FireStoreUtils/FireStoreUtils";


const UseCoins = (props)=>{
    const onBuy = (price,type)=>{
        let remainder = props.coinCount-price;
        if(remainder>=0){
            if(window.confirm("Are You sure to buy Type -" + type + " ?"))
                updateCoins(props.activeTeam,remainder);
            else{}
        }
        else{
            alert('OOPss, You do not have enough coins!!');
        }

    }
    return(
        <div className="UseCoinsContainer">
            <div className="RiddleShopHead">Riddle Shop</div>
            <div className="RiddleCatalogue">
                <div className="Riddle">
                    Type-I
                    <button onClick={()=>onBuy(10,'I')} className="BuyButt"><div className="BoldParaCenter">BUY</div><p className="LightParaCenter">for 10 Coins</p></button>
                </div>
                <div className="Riddle">
                    Type-II
                    <button onClick={()=>onBuy(20,'II')} className="BuyButt"><div className="BoldParaCenter">BUY</div><p className="LightParaCenter">for 20 Coins</p></button>
                </div>
            </div>
        </div>
    );
}

export default UseCoins;