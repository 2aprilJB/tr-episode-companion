import React, { Fragment } from "react";
import Modal2 from "../../Containers/Modal2/Modal2";
import HawkMode from "../../TrEpisodeCompanion/HawkMode/HawkMode";

const proxyZonePopUp = (props)=>{
    return(
        <Fragment>
            {
                <Modal2 show = {props.show} onBackDrop = {props.onBackDrop}> {/*This below check is for ZoneCode: Z + 'number', if it is then its a charZone and HawkMode will Open*/}
                    {Math.round(props.zoneCode[1])!==NaN?<HawkMode baseUrl = {props.baseUrl} activeChar = {props.zoneCode} activeTeam = {props.activeTeam} />:null}
                </Modal2>
            }
        </Fragment>
    );
}

export default proxyZonePopUp;