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
                        {this.props.resources?<Showcase3 alerts about subObjects = {this.props.resources} activeSub = {0} />:null}
                        </div>
                    </Modal2>
                :null}
            </div>
        );
    }
}

export default ResourcesModule;