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
import AlertModule from './TrEpisodeCompanion/AlertModule/AlertModule';
import ProxyZonePopUp from './Assets/ProxyZonePopUp/ProxyZonePopUp';
import { isMarkerInsidePolygon } from './MapCvm/TheMap/DynamicMarker/DynamicMarker';
import { proxyZoneDetector } from './MapCvm/ProximityDetectors/ProximityDetectors';
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
    refBaseUrl: 'https://tr-episode-companion-default-rtdb.firebaseio.com/',
    baseUrls:{
      dynamicBase1: "https://tr-dynamicbase-1-default-rtdb.firebaseio.com/",
      dynamicBase2: "https://tr-dynamicbase-2-default-rtdb.firebaseio.com/",
      dynamicBase3: "https://tr-dynamicbase-3-default-rtdb.firebaseio.com/",
      dynamicBase4: "https://tr-dynamicbase-4-default-rtdb.firebaseio.com/",
      staticBase:"https://tr-staticbase-default-rtdb.firebaseio.com/"
    },
    activeTeamCoords:['',''],
    activeTeam: '?',
    charCodesArr: [],
    alertMsg:"",
    loggedIn: [false,'Z'],
    loading: true,
    storeOptions: {},

    publicCoords:{},
    activeProxyZone:'',
    popUpValidator: false
  }

  componentDidMount(){
    let cookArr = document.cookie;
        if(cookArr !== '0'){
            this.setState({
                loggedIn: cookArr.split(",")
            })
        }
        else{
          document.cookie = '0';
        }
    let tempTeam = document.cookie.split(',')[1]?document.cookie.split(',')[1]:'?';
            axios.get(this.state.baseUrls.staticBase + '.json')
                 .then(response=>{
                    // 
                    let tempHawkPass = response.data.hawkPassCode;
                    let tempManagerPass = response.data.managerPassCode;
                    this.setState({
                      activeTeam: tempTeam,
                      hawkPassCode: tempHawkPass,
                      managerPassCode: tempManagerPass,
                      backImgs: response.data.backImgs,
                      newsUpdates:response.data.newsUpdates,
                      storeOptions: response.data.storeOptions,
                      publicCoords:response.data.publicCoords
                    })
                 })
                 .catch(err=>{
                  alert("Network Error");
                  console.log(err);
                 })
            axios.get(this.state.baseUrls.dynamicBase2 + '.json')
                 .then(response=>{
                    let tempCharCodes = response.data.characters[0]; 
                    this.setState({
                      charCodesArr: tempCharCodes
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
          if(typeof navigator.geolocation.watchPosition !== 'function'){          //This Extra part is to fix that bug that sometimes led to no Location
              navigator.geolocation.getCurrentPosition(position=>{
                  const latitude = position.coords.latitude;
                  const longitude = position.coords.longitude;
                  updateActiveTeamCoords(this.state.activeTeam,[latitude,longitude],this.state.charCodesArr);
                  this.setState({activeTeamCoords:[latitude,longitude]});

                  //Making listeners for ActiveCoords currentActiveCoords
                  let ts = this.state;
                  if(ts.publicCoords.polygons){
                    proxyZoneDetector(ts.activeTeamCoords,ts.publicCoords.polygons.charProxies,ts.activeProxyZone,this.activeProxyZoneHandler);
                    console.log(this.state.activeProxyZone)}
                  else{}
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
                  updateActiveTeamCoords(this.state.activeTeam,[latitude,longitude],this.state.charCodesArr);
                  this.setState({activeTeamCoords:[latitude,longitude]});

                  //Making listeners for ActiveCoords currentActiveCoords
                  let ts = this.state;
                  if(ts.publicCoords.polygons){
                    proxyZoneDetector(ts.activeTeamCoords,ts.publicCoords.polygons.charProxies,ts.activeProxyZone,this.activeProxyZoneHandler);
                  }
                  else{}
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
activeProxyZoneHandler = (zoneCode)=>{
  let showValidator = false;
  if(zoneCode!==''){
      showValidator = true
  }
  else{}
  this.setState({
    activeProxyZone: zoneCode,
    popUpValidator: showValidator
  })
}
onValidatorBackDrop = ()=>{
  this.setState({
    popUpValidator: false
  })
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
    axios.get(this.state.baseUrls.dynamicBase3 + '.json')
         .then(resp=>{
            let creds = resp.data.credentials;          //Retrieving credentials array from server
            creds.map((ele,ind)=>{
                if(ele[3]===loggedIn[1]){ //Finding credential using TeamCode
                    creds[ind][2] = false;
                    axios.put(this.state.baseUrls.dynamicBase3 + 'credentials/' + ind + '.json',creds[ind]) //Updating credentials that user has logged out
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

    let landing = <div style={{backgroundColor: "#fff", paddingTop: "3rem"}} className="App"><Landing baseUrl = {this.state.baseUrls} /><Footer /></div>
    let mainApp = <div style={{backgroundImage:back}} className="App">
                    
                    {this.state.hawkMode?<HawkMode/>:this.state.managerMode?<ManagerMode activeTeamCoords = {this.state.activeTeamCoords} baseUrl = {this.state.baseUrls} />:<TrCompanion activeTeamCoords = {this.state.activeTeamCoords} trueCreds = {this.state.trueCreds} storeOptions = {this.state.storeOptions} setActiveCoords = {this.setActiveCoords} credentialsUrl= {this.state.baseUrls.dynamicBase3 + 'credentials'} loggedIn = {this.state.loggedIn} loggedInHandler = {this.loggedInHandler} logoutHandler = {this.logoutHandler} baseUrl = {this.state.baseUrls}  />}
                    <Footer />
                  </div>
    let managerMode = <div style={{backgroundImage:back, paddingTop: "8rem"}} className="App"><HeroDisplay addSpace baseUrl = {this.state.baseUrls.staticBase + 'billBoards/managerMode'}/></div>
    let mapCVM = <div style={{backgroundImage:back, paddingTop: "3rem"}} className="App"><MapCvm activeTeam = {this.state.activeTeam} activeTeamCoords = {this.state.activeTeamCoords} loggedIn = {this.state.loggedIn} logoutHandler = {this.logoutHandler} baseUrls = {this.state.baseUrls} /></div>
    // let polygonGen = <div style={{backgroundImage:back, paddingTop: "3rem"}} className="App"><PolygonGen /></div>
    let contactUs = <div style={{backgroundImage:back, paddingTop: "8rem"}} className="App"><HeroDisplay addSpace baseUrl = {this.state.baseUrls.staticBase + 'billBoards/contactUs'}/></div>
      return (
        this.state.refBaseUrl?<BrowserRouter>
            {/* If Menu or News icons are clicked they are handled here.... */}
            {this.state.showMenu?<Menu baseUrl = {this.state.baseUrls.staticBase} backDrop = {this.onMenuBackDrop}/>:null}
                    {this.state.showNews?<Modal show = {this.state.showNews} onBackDrop = {this.onNewsBackDrop}>
                      <h2 className='NewsHead'>Latest Updates</h2>
                      {this.state.newsUpdates.map((ele,ind)=>{
                        return(<h3 key={'NewsUpdate' + ind} style={{color:"crimson"}}>***  {ele}</h3>)
                      })}
                    </Modal>:null}
                    {/* ...And Here it Ends */}
            
            <div className='AppBarContainer'>
              {/* <AlertMsgPopUp/> */}
              {this.state.activeTeam!=='?'?<ProxyZonePopUp activeTeam = {this.state.activeTeam} baseUrl = {this.state.baseUrls} zoneCode = {this.state.activeProxyZone} show = {this.state.popUpValidator} onBackDrop = {this.onValidatorBackDrop} />:null}
              
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
        </BrowserRouter>:null
      );
  }
}


export default App;



