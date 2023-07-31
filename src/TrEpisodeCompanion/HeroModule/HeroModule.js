import React, { Component } from "react";
import "./HeroModule.css";
import Modal from "../../Containers/Modal/Modal";
//To use this component add following props:-
//'heroBillBoard' : ['HeroTitle', 'HeroDescription', 'HeroBackImgUrl', [ideaButts]]
//"heroBillBoard[0]" will be Heading for this module, Max. 3 words
//"heroBillBoard[1]" will be small description of the module, Max. 20 words
//"heroBillBoard[2]" will be the url for heroBillBoard BackImg
//"heroBilllBoard[3]" an array containing details concerned with an idea button

class HeroModule extends Component{
    state = {
        showModal: false
    }
    onBackDrop = ()=>{
        this.setState({
            showModal: false
        })
    }
    onShowModal = (elem)=>{
        this.setState({
            showModal: true,
            modalContent: elem
        })
    }
    render(){
        let back = 'linear-gradient(#000000d5,#00000000),url("' + this.props.heroBillBoard[2] + '")'; 
        let colorScheme = ['#2d8fda60','#ff2172a6']; //Default color scheme
        if(this.props.heroBillBoard[4]) 
            colorScheme = this.props.heroBillBoard[4];
        else{}

        let tempHeroBillBoard = this.props.heroBillBoard; //Jugaad if heroBillBoard array is empty
        if(!this.props.heroBillBoard)
            tempHeroBillBoard = ['','']
        else{}
        return(
            <div style={{backgroundImage:"linear-gradient(45deg,"+ colorScheme[0] +","+colorScheme[1]+ ")"}} className="HeroWrapper">
                <div className="KeepModalFloat">
                    {this.state.showModal?<Modal show = {this.state.showModal} onBackDrop = {this.onBackDrop}>
                        <div className="ModalContent">
                            <h2 className="ModalContentTitle">{this.state.modalContent[0]}</h2>
                            <div className="IdeaCoverImg" style={{backgroundImage: 'url("' + this.state.modalContent[3] + '")'}}></div>
                            <p className="ModalContentDetails">{this.state.modalContent[1]}</p>
                            <a className="ModalLink" href={this.state.modalContent[2]}>{this.state.modalContent[2]}</a>
                        </div>
                    </Modal>:null}
                </div>
                <div style={{backgroundImage:back}} className="BillBoard">
                    <h2 className="BillBoardHead">{tempHeroBillBoard[0]}</h2>
                    <p className="BillBoardPar">{tempHeroBillBoard[1]}</p>
                </div>
                <div className="LinkTab">
                    <h3>USEFUL LINKS</h3>
                    <div className="LinksModule">
                        {this.props.heroBillBoard[3].map(ele=>{
                            return(
                                <div key={ele[0]} className="IdeaButtContainer">
                                    <div onClick={()=>{this.onShowModal(ele);}} className="LinkButt">
                                        <ion-icon name="bulb-outline"></ion-icon>
                                    </div>
                                    <p className="IdeaButtName">{ele[0]}</p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        )
    }
}

export default HeroModule;