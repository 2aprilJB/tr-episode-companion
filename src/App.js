//Git token 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
import TrCompanion from './TrEpisodeCompanion/TrCompanion';
import './App.css';
import HawkMode from './TrEpisodeCompanion/HawkMode/HawkMode';
import axios from 'axios';
import { Component } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Footer from './Footer/Footer';
import ManagerMode from './TrEpisodeCompanion/ManagerMode/ManagerMode';
import Menu from './Containers/Menu/Menu';
import AppBar from './Containers/AppBar/AppBar';
import Modal from './Containers/Modal/Modal';
import HeroDisplay from './TrEpisodeCompanion/HeroDisplay/HeroDisplay';
import MapCvm from './MapCvm/MapCvm';
import Landing from './Landing/Landing';
import { updateActiveTeamCoords } from './FireStoreUtils/FireStoreUtils';
import { popUpAlertMsg } from './FireStoreUtils/FireStoreUtils';
import AlertMsgPopUp from './Assets/ALertMsgPopUp/AlertMsgPopUp';
import AlertModule from './TrEpisodeCompanion/AlertModule/AlertModule';
class App extends Component {

  state = {
    hawkMode: false,
    managerMode: false,
    hawkPassCode: '',
    managerPassCode: '',
    newsUpdates: [''],
    showMenu:false,
    showNews:false,
    backImgs: '',
    baseUrl: 'https://tr-episode-companion-default-rtdb.firebaseio.com/',
    activeTeamCoords:['',''],
    activeTeam: '?',
    charCodesArr: [],
    alertMsg:"",
    loggedIn: [false,'Z'],
    credentialsUrl: 'https://tr-episode-companion-default-rtdb.firebaseio.com/credentials',
    loading: true,
    storeOptions: {}
  }

  //For Log in And Log out handling
loggedInHandler = (tempLog)=>{
  this.setState({
     loggedIn: tempLog
  })
}
logoutHandler=(loggedIn)=>{
    this.setState({
        loading: true
    })
    axios.get(this.state.credentialsUrl + '.json')
         .then(resp=>{
            let creds = resp.data;          //Retrieving credentials array from server
            creds.map((ele,ind)=>{
                if(ele[3]===loggedIn[1]){ //Finding credential using TeamCode
                    creds[ind][2] = false;
                    axios.put(this.state.credentialsUrl + '/' + ind + '.json',creds[ind]) //Updating credentials that user has logged out
                         .then(resp=>{
                            this.setState({
                                loading: false
                            })
                         }) 
                        .catch(err=>{
                            console.log(err);
                            alert('Theres some serious Network Error');
                         })
                }
                else{
                    this.setState({  //Loaded with wrong 
                        loading: false
                    })
                }
            })
            document.cookie = 0;  
         })
         .catch(err=>{
            console.log(err);
            alert('Theres some serious Network Error');
         })

    this.setState({    //Updating root state to load back to the login screen
        loggedIn: [false,'Z']
    })
  }

  componentDidMount(){
    // if(this.state.alertMsg!==popUpAlertMsg()){
    //   this.setState({
    //     alertMsg:popUpAlertMsg()
    //   })
    //   alert(popUpAlertMsg());
    // }
    // else{}
    // console.log(popUpAlertMsg());
    // if(popUpAlertMsg().data){
    // }
    // else{console.log('glith')}

    let cookArr = document.cookie;
        if(cookArr != '0'){
            this.setState({
                loggedIn: cookArr.split(",")
            })
        }
        else{}
    let tempTeam = document.cookie.split(',')[1]?document.cookie.split(',')[1]:'?';
    axios.get(this.state.baseUrl + '.json')
         .then(resp=>{
            let tempCharCodes = resp.data.characters[0];
            let tempHawkPass = resp.data.hawkPassCode;
            let tempManagerPass = resp.data.managerPassCode;
            this.setState({
              charCodesArr: tempCharCodes,
              activeTeam: tempTeam,
              hawkPassCode: tempHawkPass,
              managerPassCode: tempManagerPass,
              backImgs: resp.data.backImgs,
              newsUpdates:resp.data.newsUpdates,
              storeOptions: resp.data.storeOptions
            })
         })
         .catch(err=>{
            alert("Network Error");
            console.log(err);
         })

         const options = {
          enableHighAccuracy: true,
          timeout: 5000,
          maximumAge: 0
      }
      if (navigator.geolocation) {
          if(typeof navigator.geolocation.watchPosition !== 'function'){
              navigator.geolocation.getCurrentPosition(position=>{
                  const latitude = position.coords.latitude;
                  const longitude = position.coords.longitude;
                  updateActiveTeamCoords(this.state.activeTeam,[latitude,longitude],this.state.charCodesArr);
                  this.setState({activeTeamCoords:[latitude,longitude]});
              },err=>{
                  
                  if(err.code===2)
                      console.log("Unable to retrieve your location");
                  else if(err.code===3)
                      console.log('Shits happening');
              },options)
          }
          else{
              navigator.geolocation.watchPosition(position=>{
                  const latitude = position.coords.latitude;
                  const longitude = position.coords.longitude;
                  console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
                  

                  updateActiveTeamCoords(this.state.activeTeam,[latitude,longitude],this.state.charCodesArr);
                  this.setState({activeTeamCoords:[latitude,longitude]});
  
              },err=>{
                  
                  if(err.code===2)
                      console.log("Unable to retrieve your location");
                  else if(err.code===3)
                      console.log('Shits happening');
              },options);   
          }
      }

      else {
          alert('Not supported in your goddamn browser')
      }





  }
  setActiveCoords = (coords)=>{
    this.setState({
      activeTeamCoords: coords
    })
  }
  showMenuHandler = ()=>{
    this.setState({
      showMenu: true
    })
  }
  showNewsHandler = ()=>{
    this.setState({
      showNews: true
    })
  }
  onMenuBackDrop = ()=>{
    this.setState({
      showMenu: false
    })
  }
  onNewsBackDrop = ()=>{
    this.setState({
      showNews: false
    })
  }
  
  render(){
    
    let onHawkClick=()=>{
      let secretCode = prompt('Enter The Secret Code,If You are a Hawk:');
      if(secretCode === this.state.hawkPassCode)
        this.setState({
          hawkMode: !this.state.hawkMode
        })
      else if(secretCode === this.state.managerPassCode){
        this.setState({
          managerMode: !this.state.managerMode
        })
      }
      else{}
    }
    let back = 'url("' + this.state.backImgs + '")'; 

    let landing = <div style={{backgroundColor: "#fff", paddingTop: "3rem"}} className="App"><Landing baseUrl = {this.state.baseUrl} /><Footer /></div>
    let mainApp = <div style={{backgroundImage:back}} className="App">
                    
                    {this.state.hawkMode?<HawkMode/>:this.state.managerMode?<ManagerMode baseUrl = {this.state.baseUrl} />:<TrCompanion storeOptions = {this.state.storeOptions} charCodesArr = {this.state.charCodesArr} setActiveCoords = {this.setActiveCoords} credentialsUrl= {this.state.credentialsUrl} loggedIn = {this.state.loggedIn} loggedInHandler = {this.loggedInHandler} logoutHandler = {this.logoutHandler} baseUrl = {this.state.baseUrl}  />}
                    <Footer />
                  </div>
    let managerMode = <div style={{backgroundImage:back, paddingTop: "8rem"}} className="App"><HeroDisplay addSpace baseUrl = {this.state.baseUrl + 'billBoards/managerMode'}/></div>
    let mapCVM = <div style={{backgroundImage:back, paddingTop: "3rem"}} className="App"><MapCvm activeTeam = {this.state.activeTeam} charCodesArr = {this.state.charCodesArr} activeTeamCoords = {this.state.activeTeamCoords} loggedIn = {this.state.loggedIn} logoutHandler = {this.logoutHandler} baseUrl = {this.state.baseUrl} /></div>
    // let polygonGen = <div style={{backgroundImage:back, paddingTop: "3rem"}} className="App"><PolygonGen /></div>
    let contactUs = <div style={{backgroundImage:back, paddingTop: "8rem"}} className="App"><HeroDisplay addSpace baseUrl = {this.state.baseUrl + 'billBoards/contactUs'}/></div>
      return (
        <BrowserRouter>
            {/* If Menu or News icons are clicked they are handled here.... */}
            {this.state.showMenu?<Menu baseUrl = {this.state.baseUrl} backDrop = {this.onMenuBackDrop}/>:null}
                    {this.state.showNews?<Modal show = {this.state.showNews} onBackDrop = {this.onNewsBackDrop}>
                      <h2 className='NewsHead'>Latest Updates</h2>
                      {this.state.newsUpdates.map((ele,ind)=>{
                        return(<h3 key={'NewsUpdate' + ind} style={{color:"crimson"}}>***  {ele}</h3>)
                      })}
                    </Modal>:null}
                    {/* ...And Here it Ends */}
            
            <div className='AppBarContainer'>
              {/* <AlertMsgPopUp/> */}
              <AlertModule/>
              <AppBar hawkClick = {onHawkClick} menuClick = {this.showMenuHandler} newsClick = {this.showNewsHandler} />
            </div>
            <Routes>
              <Route path='/' exact element = {landing}/>
              <Route path='/login' exact element = {mainApp}/>
              <Route path='/managerMode' exact element = {managerMode}/>
              <Route path='/mapCVM' exact element = {mapCVM}/>
              {/* <Route path='/polygonGen' exact element = {polygonGen}/> */}
            </Routes>
        </BrowserRouter>
      );
  }
}


export default App;



