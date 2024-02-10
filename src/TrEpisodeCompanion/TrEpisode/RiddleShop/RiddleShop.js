import React, { useEffect, useState } from "react";
import "./RiddleShop.css";
// import { updateCoins } from "../../../FireStoreUtils/FireStoreUtils";
import Modal3 from '../../../Containers/Modal3/Modal3';
import billImg from '../../../Assets/Images/board.png';
import axios from "axios";


const RiddleShop = (props)=>{

    const [showModal,setShowModal] = useState(); //Only For showModal that's going to pop when when specaialArtifactZone is stepped on
    useEffect(()=>{
        setShowModal(true)
    },[])

    const onBuy = (price,type)=>{

        //Lets add a check to ensure the state's coinCount matches with the server's
        axios.get(props.baseUrl.dynamicBase4 + '.json')
             .then(resp=>{
                let allCoins = resp.data.backUpTrCoins;
                allCoins.map((ele,ind)=>{
                    if(ele[0]===props.activeTeam){
                        if(ele[1]===props.coinCount[1]){    //If props coinCount matches with with server's coin count Buying will proceed

                            let remainder = Number(props.coinCount[1]-price);   
                            if(remainder>=0){
                                if(window.confirm("Are You sure to buy Type -" + type + " ?")){
                                    props.boatRefreshed();
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
                        else{
                            alert('Refresh Coins To buy');
                        }
                    }
                    else{}
                })
             })
             .catch(err=>{
                console.log(err);
                alert('Network issue');
             })

        

    }
    return(
        <div className="UseCoinsContainer"> 
            {/* <CoinSpinner/> */}
            
            {/* PASTE HERE WHEN **TR COIN HUNT** IS Going On */}
            {
                props.activeProxyZone!=='ZRS'?null:
                <Modal3 noCross = {true} show = {showModal} onBackDrop = {()=>setShowModal(false)}>
                    <img className="BillImg" src={billImg}></img>
                    <div className="RiddleShopHead">
                        Riddle Shop
                    </div>
                    <div className="RiddleShop">
                        <img className="ShopBackBoard" src="https://images.vexels.com/media/users/3/164273/isolated/lists/a64481d86e7873605b7430b3a407a152-hanging-wooden-sign-board.png"></img>
                        <div className="RiddleCatalogue">
                            {props.refreshState!==false?
                                <div className="BuyRiddle">
                                    <h3 className="ButChitTypeHead">Type-I</h3>
                                    <button onClick={()=>onBuy(props.buyOpts.i,'i')} className="BuyButt"><div className="BoldParaCenter">BUY</div><p className="LightParaCenter">for {props.buyOpts.i} Coins</p></button>
                                </div>
                            :<div className="NoRiddle">Solve <br/> or <br/>Refresh <br/>To buy More</div>
                            }
                        </div>
                    </div>
                </Modal3>
            }
            
        </div>
    );
}

export default RiddleShop;


/* When TR Episode is under Maintainance paste below code above at pointed location */


            