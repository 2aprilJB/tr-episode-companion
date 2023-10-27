import React, { Fragment } from "react";
import "./ProxyZonePopUp.css";
import Modal from "../../Containers/Modal/Modal";
import Modal2 from "../../Containers/Modal2/Modal2";
import HawkMode from "../../TrEpisodeCompanion/HawkMode/HawkMode";
import TiltCodeGen from "../../MapCvm/TheMap/PublicDynamic/SpecialArtifacts/TiltCodeGen/TiltCodeGen";

const proxyZonePopUp = (props)=>{
    
    return(
        <Fragment>
                <Modal2 show = {props.show} onBackDrop = {props.onBackDrop}> {/*This below check is for ZoneCode: Z + 'number', if it is then its a charZone and HawkMode will Open*/}
                    <HawkMode baseUrl = {props.baseUrl} activeChar = {props.zoneCode} activeTeam = {props.activeTeam} />
                </Modal2>
        </Fragment>
    );
}

export default proxyZonePopUp;