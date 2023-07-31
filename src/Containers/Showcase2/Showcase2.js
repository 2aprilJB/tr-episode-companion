import React, { Component } from 'react';
import classes from './Showcase2.module.css';
/*How to USE??

---Give it 'modules' prop, that'll be an array of Module's names you want to show with it
---And Make sure there are at least two children inside*/

/*---------For-Customizations----------
-->'Tab' class can be modified
-->'ActiveTab can be modified'*/
class Showcase2 extends Component{
    state = {
        activeContent: this.props.children[this.props.activeSub],
        activeIndex: this.props.activeSub,
    }
    onClickHandler = (toRender,index)=>{
        this.setState({
            activeContent: toRender,
            activeIndex: index,
        });
    }
    render(){
        return(
            <div className = {classes.Showcase2}>
                {this.props.children.map((module,ind)=>{
                    return (
                        <div className = {classes.Showing} key = {'showing_' + ind}>
                            <div onClick = {()=>this.onClickHandler(module,ind)} className = {classes.Tab} style = {ind===this.state.activeIndex?{backgroundColor: this.props.colors[1], borderRadius: '100px'}:{backgroundColor: this.props.colors[0]}}>
                                <div className = {classes.PlusMinusContainer}>
                                    <div className = {classes.PlusMinus}></div>
                                </div>    
                                <div className = {classes.ContentName}>{this.props.modules[ind]}</div>
                            </div>
                            {ind === this.state.activeIndex?(this.state.activeContent ? this.state.activeContent : null):null}
                        </div>
                    );
                })}
            </div>
        );
    }
}

export default Showcase2;