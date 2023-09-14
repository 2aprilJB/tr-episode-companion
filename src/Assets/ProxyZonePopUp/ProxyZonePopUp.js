import React from "react";
import Modal from "../../Containers/Modal/Modal";
import HawkMode from "../../TrEpisodeCompanion/HawkMode/HawkMode";

const proxyZonePopUp = (props)=>{
    return(
        <Modal show = {props.show} onBackDrop = {props.onBackDrop}>
            <HawkMode baseUrl = {props.baseUrl} activeChar = {props.zoneCode} activeTeam = {props.activeTeam} />
        </Modal>
    );
}

export default proxyZonePopUp;