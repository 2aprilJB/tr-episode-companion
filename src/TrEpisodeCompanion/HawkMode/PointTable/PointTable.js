import React, { Component } from "react";
import "./PointTable.css";
import axios from "axios";

class PointTable extends Component{
    state = {
        points: {}
    }

    componentDidMount(){
        axios.get(this.props.baseUrl.dynamicBase3 + 'points.json')
                 .then(resp=>{
                    this.setState({
                        points: resp.data
                    })
                 })
                 .catch(err=>{
                    alert('Network Issues');
                    console.log(err);
                 })
    }
    render(){
        let onRefresh = ()=>{
            axios.get(this.props.baseUrl.dynamicBase3 + 'points.json')
                 .then(resp=>{
                    this.setState({
                        points: resp.data
                    })
                 })
                 .catch(err=>{
                    alert('Network Issues');
                    console.log(err);
                 })
        }
        let Tpts = this.state.points.map(ele=>{
            return(
                <div key={ele + "mad"} className="TeamPoints">
                        <h4 className="TeamCode">{ele[0]}</h4>
                        <h4 className="TeamPts">{ele[1]}</h4>
                </div>
            )
        })
        return(
            <div className="PointTableContainer">
                Tap to Refresh Score
                <button onClick={onRefresh} className="RefreshPoints"><ion-icon name="reload-circle-outline"></ion-icon></button>
                <div className="Table">
                    {Tpts}
                </div>
            </div>
        )
    }
}

export default PointTable;