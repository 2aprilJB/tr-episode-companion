import React, { Component } from 'react';
import classes from './Showcase.module.css';

class Showcase extends Component{
    state = {
        Content: this.props.children[0],
        index: 0,
    }
    onTabClick = (tabContent,index)=>{
        this.setState({
            Content: tabContent,
            index: index,
        });
    }
    backClickHandler = ()=>{
        let currentIndex = this.state.index;
        currentIndex<1?currentIndex = this.props.children.length-1:currentIndex--;
        let currentContent = this.props.children[currentIndex];
        this.setState({
            Content: currentContent,
            index: currentIndex,
        });
    }
    forwardClickHandler = ()=>{
        let currentIndex = this.state.index;
        currentIndex>(this.props.children.length-2)?currentIndex = 0:currentIndex++;
        let currentContent = this.props.children[currentIndex];
        this.setState({
            Content: currentContent,
            index: currentIndex,
        });
    }
    render(){
        // Note: you must add prop "top" or "bottom" to specify where navigation panel shall be TOP or Bottom
    let inactiveTabStyle = null;
    let activeTabStyle = {border: "3px solid red"};
    if(this.props.small){
        activeTabStyle = {border: "3px solid red",width: '0.5rem',height: '0.5rem'};
        inactiveTabStyle = {width: '0.5rem', height: '0.5rem'};
    }
    return(
        <div className = {classes.Showcase}>
            {this.props.bottom?<div className = {classes.Content}>{this.state.Content}</div>:null}

            
            <div className = {classes.ShowTabs}>
                <ion-icon onClick = {this.backClickHandler} name = "arrow-back-circle"/>
                {this.props.children.map((tab,ind)=>{
                    return <div style = {this.state.index === ind ?activeTabStyle:inactiveTabStyle} key = {ind + 'tabs'} onClick = {()=>this.onTabClick(tab,ind)} className = {classes.Tabs}> </div>;
                })}
                <ion-icon onClick = {this.forwardClickHandler} name = "arrow-forward-circle"/>
            </div>

            {this.props.top?<div className = {classes.Content}>{this.state.Content}</div>:null}
        </div>
    );
    }
}

export default Showcase;