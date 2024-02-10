import React, { Component } from "react";
import "./GuessNumGen.css";

//This Component requires 3 props
//1. num : The number user will have to guess
//2. range : The range between user will have to guess
//3. correctResult : The result text/number user will get

class GuessNumGen extends Component{
    state = {
        inpNum: 0,
        show:''
    }

    render(){
        let onChangeHandler = (e)=>{
            this.setState({
                inpNum: e.target.value
            })
        }
        let onCheckHandler = ()=>{
            let inpN = Number(this.state.inpNum);
            if(inpN<this.props.num){
                this.setState({
                    show: 'Your guess is *Lower*'
                })
            }
            else if(inpN>this.props.num){
                this.setState({
                    show: 'Your guess is *Higher*'
                })
            }
            else if(inpN === this.props.num){
                this.setState({
                    show: 'correct'
                })
            }
        }
        let onCopyThatCode = ()=>{
            let copyCode = document.getElementById("CorrectGuess");
            // copyCode.select();
            // copyCode.setSelectionRange(0, 99999); // For mobile devices
            // Copy the text inside the text field
            navigator.clipboard.writeText(copyCode.innerText);
        }

        return(
            <div className="GuessNumContainer">
                <div className="GuessNumTitle">
                    Guess The Best
                </div>
                {/* <div className="GuessNumHead">
                    ?? GUESS THE NUMBER ??
                </div> */}
                <h3 className="GuessNumText">Guess the number <br/> from 0 to {this.props.range}</h3>
                <div className="GuessNumInpDiv">
                    <input onChange={onChangeHandler} className="GuessNumInpText" type="number" />
                    <button onClick={onCheckHandler} className="GuessNumCheckButt">Check</button>
                </div>

                <div className="GuessNumText2">{this.state.show?this.state.show==='correct'?
                    <div>
                        <button className="CopyThatCode" onClick={onCopyThatCode}>COPY <ion-icon name="clipboard-outline"></ion-icon> CODE</button>
                        <h1 id="CorrectGuess" style={{color:"lime", fontSize:"1.3rem"}}>{this.props.correctResult}</h1>
                    </div>
                    :
                    this.state.show:null}
                </div>
            </div>
        );
    }
}

export default GuessNumGen;