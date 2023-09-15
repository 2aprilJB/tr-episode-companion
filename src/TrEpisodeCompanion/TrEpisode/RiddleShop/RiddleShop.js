import React from "react";
import "./RiddleShop.css";
// import { updateCoins } from "../../../FireStoreUtils/FireStoreUtils";
import billImg from '../../../Assets/Images/board.png';
import axios from "axios";


const UseCoins = (props)=>{
    const onBuy = (price,type)=>{
        let remainder = props.coinCount[1]-price;
        if(remainder>=0){
            if(window.confirm("Are You sure to buy Type -" + type + " ?")){
                // updateCoins(props.activeTeam,remainder);   //This will be used when we are storing TrCoins in Our FireStore
                axios.put(props.baseUrl.dynamicBase4 + 'backUpTrCoins/' + props.coinCount[0] + '/1.json',remainder)
                     .catch(err=>{
                        console.log(err);
                        alert('Network Error')
                     })
                props.updateCoinState([props.coinCount[0],remainder]);
                props.buyHandler(type);
            }
            else{}
        }
        else{
            alert('OOPss, You do not have enough coins!!');
        }

    }
    return(
        <div className="UseCoinsContainer"> 
            {/* <CoinSpinner/> */}
            <img className="BillImg" src={billImg}></img>
            <div className="RiddleShopHead">
                Riddle Shop
            </div>
            {/* PASTE HERE WHEN **TR COIN HUNT** IS Going On */}
            
            {props.bought?
                <div className="RiddleShop">
                    <img className="ShopBackBoard" src="https://images.vexels.com/media/users/3/164273/isolated/lists/a64481d86e7873605b7430b3a407a152-hanging-wooden-sign-board.png"></img>
                    <div className="RiddleCatalogue">
                        <div className="NoRiddle">
                            <h3 className="ButChitTypeHead">Solve below Riddle to buy again</h3>
                        </div>
                    </div>
                </div>
                :
                <div className="RiddleShop">
                    <img className="ShopBackBoard" src="https://images.vexels.com/media/users/3/164273/isolated/lists/a64481d86e7873605b7430b3a407a152-hanging-wooden-sign-board.png"></img>
                    <div className="RiddleCatalogue">
                        <div className="BuyRiddle">
                            <h3 className="ButChitTypeHead">Type-I</h3>
                            <button onClick={()=>onBuy(props.buyOpts.i,'i')} className="BuyButt"><div className="BoldParaCenter">BUY</div><p className="LightParaCenter">for {props.buyOpts.i} Coins</p></button>
                        </div>
                        <div className="BuyRiddle">
                            <h3 className="ButChitTypeHead">Type-II</h3>
                            <button onClick={()=>onBuy(props.buyOpts.ii,'ii')} className="BuyButt"><div className="BoldParaCenter">BUY</div><p className="LightParaCenter">for {props.buyOpts.ii} Coins</p></button>
                        </div>
                    </div>
                </div>
            }
            
        </div>
    );
}

export default UseCoins;


/* When TR Episode is under Maintainance paste below code above at pointed location */


            // <div className="RiddleShop">
            //     <img className="ShopBackBoard" src="https://images.vexels.com/media/users/3/164273/isolated/lists/a64481d86e7873605b7430b3a407a152-hanging-wooden-sign-board.png"></img>
            //     <div className="RiddleCatalogue">
            //         <div className="NoRiddle">
            //             <h3 className="ButChitTypeHead">TR COIN MINING IS GOING ON</h3>
            //         </div>
            //     </div>
            // </div>