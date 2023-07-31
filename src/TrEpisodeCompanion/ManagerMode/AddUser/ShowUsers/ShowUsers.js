import React, { Component } from "react";
import './ShowUsers.css';
import axios from "axios";

class ShowUsers extends Component{
    state = {
        users: []
    }
    componentDidMount(){
        axios.get(this.props.fetchUrl)
         .then(resp=>{
            let temp = resp.data;
            this.setState({
                users:temp
            })
         }) 
         .catch(err=>{
            console.log(err);
            alert('Some Network issur fuck the head off desk')
         })
    }


    loggedOutHandler = (indexOfUser)=>{
        let tempUsers = this.state.users;
        tempUsers[indexOfUser][2] = false;
        
        if(window.confirm("Are Sure to change")){
            axios.put(this.props.fetchUrl,tempUsers)
                .then(resp=>{
                    alert('The user Logged in status changed to: ' + tempUsers[indexOfUser][2] + '  Team : ' + tempUsers[indexOfUser][3])
                })
                .catch(err=>{
                    console.log(err);
                    alert('There is an error that will give orgasm to the developer')
                });
        }
        else
            console.log('Manager chhe samajhdar')
    }
    userDeleteHandler = (indexOfUser)=>{
        let tempUsers = this.state.users;
        tempUsers.splice(indexOfUser,1);
        if(window.confirm('Are You sure to delete user: ' + ' ??'))
            axios.put(this.props.fetchUrl,tempUsers)
                .catch(err=>{
                    console.log('Good error to blow the developer away');
                    alert('Supaah errrorr');
                })
        else{
            console.log('Manager bada smart lagat baa, par ee sasura developer')
        }
    }
    render(){
        return(
            <div className="ShowUserCredentials">
                {this.state.users.map((elem,index)=>{
                    return(
                        <div key={elem[0] + '1'} className="UserCredentials">
                            <div onClick={()=>this.userDeleteHandler(index)} key={elem} className="UserDetails" style={{backgroundColor:"green", color: "white",width:"10%", borderRadius: "5px"}}>{'.' + index + '.'}</div>
                            {elem.map((ele,ind)=>{
                                if(ind===3){
                                    return(
                                        <div onClick={()=>this.loggedOutHandler(index)} key={ele} style={{backgroundColor:'blue',color: 'white',borderRadius:'5px'}} className="UserDetails">{'.. ' + ele + ' ..'}</div>    
                                    )
                                }
                                else
                                return(
                                    <div key={ele} className="UserDetails">{ele + ''}</div>
                                )
                            })}
                        </div>
                    )
                })}
            </div>
        );
    }
}

export default ShowUsers;