import React, { Component } from "react";
import Showcase from "../../Containers/Showcase/Showcase";
import HeroModule from "../HeroModule/HeroModule";
import "./HeroDisplay.css";
import axios from "axios";

class HeroDisplay extends Component{
    state = {
        billBoards: [],
        show: false
    }

    componentDidMount(){
        axios.get(this.props.baseUrl + '.json')
             .then(response=>{
                this.setState({
                    billBoards: response.data,
                    show: true
                })
             })
             .catch(err=>{
                console.log(err);
                alert('Network Error please report to the desk')
             })
    }
    //Pass on 'heroBillBoard' array as : ['HeroTitle', 'HeroDescription', 'HeroBackImgUrl', [ideaButts],['1color','2color]]
    //'ideaButts' would be an Array as : [['ideaTitle', 'ideaDescription', 'FurtherLink', 'ideaCoverImg Url']]
    render(){
        let toRender = null;
        if(this.state.show){
            toRender = <Showcase bottom>
                {this.state.billBoards.map((ele,index)=>{
                    return(
                        <HeroModule key={ele[index]} heroBillBoard = {this.state.billBoards[index]}/>
                    );
                })}
            </Showcase>
        }
        else{
            toRender = <div className="DummyHeroModule"></div>
        }

        return(toRender);
    }
}

export default HeroDisplay;