import React, { Component } from "react";
import './ResourcesModule.css';
import Modal2 from "../../../../Containers/Modal2/Modal2";
import axios from "axios";
import Showcase3 from "../../../../Containers/Showcase3/Showcase3";

class ResourcesModule extends Component{
    state = {
    }
    
    render(){
        return(
            <div>
                {this.props.display?
                    <Modal2 noCross = {true} show={true}>
                        <div className="ResourcesModuleContainer">
                        {this.props.resources?
                            <Showcase3 alerts about subObjects = {this.props.resources} activeSub = {0}>
                                <div className="ResourcesMoreButts">
                                    <div className="ResourcesMoreButtDes">
                                        <h4>STORY?</h4>
                                        <button style={{width:"2rem",height:"2rem",margin:"0.2rem"}} className="DangerButt"><ion-icon name="invert-mode-outline"></ion-icon></button>
                                    </div>
                                    <div className="ResourcesMoreButtDes">
                                        <button style={{width:"2rem",height:"2rem",margin:"0.2rem"}} className="DangerButt"><ion-icon name="invert-mode-outline"></ion-icon></button>
                                        <h4>Game?</h4>
                                    </div>
                                </div>
                            </Showcase3>
                        :null}
                        </div>
                    </Modal2>
                :null}
            </div>
        );
    }
}

export default ResourcesModule;