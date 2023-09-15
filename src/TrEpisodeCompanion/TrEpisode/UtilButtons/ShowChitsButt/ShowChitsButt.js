import React from "react";
import "./ShowChitsButt.css";
import Modal from "../../../../Containers/Modal/Modal";
import ChitCount from "../../../ChitCount/ChitCount";

const showChitsButt = (props)=>{
    return(
        <div className="ShowChitContainer">
            <Modal show = {props.showChit} onBackDrop = {()=>props.showChitCount(false)}>
                {/*ChitCount Module*/}
                <ChitCount baseUrl = {props.baseUrl.dynamicBase2}/>
            </Modal>
            <div onClick={()=>props.showChitCount(true)} className="ShowChit">
                <ion-icon name="checkbox-outline"></ion-icon>
            </div>
            <h3 className="ButtText">Show<br/>Chits</h3>
        </div>
    );
}

export default showChitsButt;