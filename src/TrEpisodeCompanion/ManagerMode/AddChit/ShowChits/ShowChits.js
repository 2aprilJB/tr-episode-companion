import React, { Component } from "react";
import axios from "axios";
import "./ShowChits.css";

class ShowChits extends Component{
    state={
        chits: {
            i: [],
            ii:[]
        },
        characters: []
    }

    componentDidMount(){
        //Storing Chracters Array to the state
        axios.get(this.props.fetchCharUrl + '.json')
             .then(resp=>{
                this.setState({
                    characters: resp.data
                })
             })
             .catch(err=>{
                console.log(err);
                alert('There is some network issue');
             })
        //Storing Chits Array to the state
        axios.get(this.props.fetchUrl + '.json')
             .then(resp=>{
                let temp = {
                    i: resp.data.i,
                    ii: resp.data.ii,
                }
                this.setState({
                    chits: temp
                })
             })
             .catch(err=>{
                console.log(err);
                alert('There is some network issue');
             })
    }

    onDeleteHandler(indexOfRiddle,typeOfRiddle){
        let tempChits = []; //Storing Type Specific chit i.e either 'i' or 'ii' as property
        let updateChits = {}; //Storing whole chits object with 'i' and 'ii' as properties
        
        //Now we'll remove the riddle code from character's codes object
        let chars = this.state.characters;
        chars.map((elem,index)=>{
            elem.map((ele,ind)=>{

                if(ele[0]===this.state.chits[typeOfRiddle][indexOfRiddle][1]){
                    chars[index].splice(ind,1)
                    console.log(chars[index][ind]);
                }
                else{
                }
            })
        })
        
        //Following If-else removes the desired Riddle from the properties
        if(window.confirm('You sure want to delete this Riddle')){
            if(typeOfRiddle === 'i'){
                tempChits = this.state.chits.i;
                tempChits.splice(indexOfRiddle,1);
                updateChits.i = tempChits;
                updateChits.ii = this.state.chits.ii;
            }
            else {
                tempChits = this.state.chits.ii;
                tempChits.splice(indexOfRiddle,1);
                updateChits.i = tempChits;
                updateChits.ii = this.state.chits.ii;
            }
        //Here we've removed the riddle and stored it in 'updateChits' now we'll simply axios.put it later
        
        
        axios.put(this.props.fetchCharUrl + '.json',chars)
             .then(resp=>{
                this.setState({
                    characters: chars
                })
             })
             .catch(err=>{
                console.log(err);
                alert('There is an error reach out to the desk');
             })
        
        axios.put(this.props.fetchUrl + '.json',updateChits)
             .then(resp=>{
                this.setState({
                    chits: updateChits
                })
             })
             .catch(err=>{
                console.log(err);
                alert('There is an error reach out to the desk');
             })
        }
    }
    render(){
        
        return(
            <div className="ShowChits">
                <div className="RiddlesNtype">
                    <h5 className="RiddleType">Type - I</h5>
                    {this.state.chits.i.map((ele,ind)=>{
                        return(
                            <ul key={'riddleTypeI' + ind} className="RiddleRow">
                                
                                <button onClick={()=>this.onDeleteHandler(ind,'i')} className="DeleteRiddle"><ion-icon name="trash-outline"></ion-icon></button>
                                <h5 className="RiddleNumber">{ind}</h5>
                                <li>{ele.map((elem,index)=>{
                                    return(<div key={elem + index}>{elem}</div>)
                                })}</li>
                            </ul>
                        )
                    })}
                    <h5 className="RiddleType">Type - II</h5>
                    {this.state.chits.ii.map((ele,ind)=>{
                        return(
                            <ul key={'riddleTypeII' + ind} className="RiddleRow">

                                <button onClick={()=>this.onDeleteHandler(ind,'ii')} className="DeleteRiddle"><ion-icon name="trash-outline"></ion-icon></button>
                                <h5 className="RiddleNumber">{ind}</h5>
                                <li>{ele.map((elem,index)=>{
                                    if(index===0){
                                        return(
                                            <div key={elem + index}>{elem}</div>
                                        )
                                    }
                                    else
                                    return(<div key={elem + index}>{elem}</div>)
                                })}</li>
                            </ul>
                        )
                    })}
                </div>
                <div className="CharacterNcodes">

                </div>
            </div>
        );
    }
}

export default ShowChits;