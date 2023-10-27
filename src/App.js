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
import Loader from './Assets/Loader/Loader';
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
      dynamicBase5: "https://tr-dynamicbase-5-default-rtdb.firebaseio.com/",
      staticBase:"https://tr-staticbase-default-rtdb.firebaseio.com/"
    },
    activeTeamCoords:null,
    activeTeam: '?',
    charCodesArr: [],
    alertMsg:"",
    loggedIn: [false,'Z'],
    loading: true,
    storeOptions: {},

    draggedCoords: [23.218907353996382, 72.64213129878046],
    publicCoords:{},
    activeProxyZone:'',
    secondaryProxy:'',
    popUpValidator: false
  }

  componentDidMount(){
    // let newBound = [[23.20368,72.66075],[23.2035,72.66079],[23.20328,72.66083],[23.20307,72.66084],[23.20287,72.66086],[23.20283,72.66097],[23.20264,72.66091],[23.20246,72.66084],[23.20213,72.66068],[23.20191,72.66105],[23.20204,72.66123],[23.20216,72.66146],[23.20225,72.66161],[23.20239,72.66168],[23.20251,72.66171],[23.20269,72.66169],[23.20279,72.66162],[23.20288,72.66148],[23.20294,72.66135],[23.20299,72.66128],[23.20304,72.66123],[23.20315,72.66119],[23.20331,72.66114],[23.20343,72.66104],[23.20354,72.66092]]

    //     axios.put(this.state.baseUrls.staticBase + 'polygons/outlineBoundary/polyCoords.json',newBound)
    //          .catch(err=>{
    //             console.log(err);
    //             alert('There is serious error');
    //          })

    let cookArr = document.cookie;
        if(cookArr !== '0'){
            this.setState({
              loading: true
            })
            axios.get(this.state.baseUrls.dynamicBase3 + 'credentials.json')
                 .then(resp=>{
                    this.setState({
                      loading: false
                    })
                    let creds = resp.data;
                    let tempLoggedIn = cookArr.split(",");

                    creds.map(ele=>{
                      let temp = [ele[2].toString(),ele[3]];
                      if(temp[0]===tempLoggedIn[0]){
                        if(temp[1]===tempLoggedIn[1]){
                            this.setState({
                              loggedIn: tempLoggedIn
                            })
                        }
                        else{}
                      }
                      else{}
                    })
                 })
                 .catch(err=>{
                  console.log(err);
                  alert("There's a network Error")
                 })
            // this.setState({
            //     loggedIn: cookArr.split(",")
            // })
        }
        else{
          document.cookie = '0';
          this.setState({
            loading: false
          })
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
                  this.setState({activeTeamCoords:[latitude,longitude]});

                  //Making listeners for ActiveCoords currentActiveCoords
                  let ts = this.state;
                  if(ts.publicCoords.polygons){
                    proxyZoneDetector(ts.activeTeamCoords,ts.publicCoords.polygons.charProxies,ts.activeProxyZone,this.activeProxyZoneHandler,ts.secondaryProxy,this.secondaryProxyHandler);
                  }
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
                  this.setState({activeTeamCoords:[latitude,longitude]});

                  //Making listeners for ActiveCoords currentActiveCoords
                  let ts = this.state;
                  if(ts.publicCoords.polygons&&ts.activeTeamCoords){
                    proxyZoneDetector(ts.activeTeamCoords,ts.publicCoords.polygons.charProxies,ts.activeProxyZone,this.activeProxyZoneHandler,ts.secondaryProxy,this.secondaryProxyHandler);
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
  if(zoneCode!=='' && zoneCode.length===2 && zoneCode!=="ZW"){
      showValidator = true
  }
  else{}
  this.setState({
    activeProxyZone: zoneCode,
    popUpValidator: showValidator
  })
}
secondaryProxyHandler = (zoneCode)=>{
  this.setState({
    secondaryProxy: zoneCode
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
     loggedIn: tempLog,
     activeTeam: tempLog[1]
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
  onHawkClick=()=>{
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
  
  setPublicCoordsForProxies = (publicCoordsArr)=>{
    this.setState({
      publicCoords: publicCoordsArr
    })
  }

  setDraggedCoords = (coordsArr)=>{
    this.setState({
      draggedCoords: coordsArr
    })
  }

  // dangerZoneHandler = (count)=>{
  //   setTimeout(()=>{
  //       if(this.state.activeProxyZone==='Danger'){
  //         if(count!==0){
  //           console.log(count);
  //           this.dangerZoneHandler(count-1);
  //         }
  //         else{
  //           console.log('Kaatu point abb??');
  //         }
  //       }
  //   },1000)
  // }
  render(){
    //This is for Handling DangerZone Point deduction
    // if(this.state.activeProxyZone==='Danger'){
    //   let countDown = 3;
    //     this.dangerZoneHandler(countDown);
    // }
    //This is for live Location updation for Characters i.e Z0-Z7
    if(this.state.activeTeam.length === 2)
      updateActiveTeamCoords(this.state.activeTeam,this.state.activeTeamCoords,this.state.charCodesArr); 
    else{}
    let back = 'url("' + this.state.backImgs + '")'; 

    let landing = <div style={{backgroundColor: "#fff", paddingTop: "3rem"}} className="App"><Landing baseUrl = {this.state.baseUrls} /><Footer /></div>
    let mainApp = <div style={{backgroundImage:back}} className="App">
                    
                    {this.state.hawkMode?<HawkMode baseUrl = {this.state.baseUrls} />:this.state.managerMode?<ManagerMode forAll = {true} draggedCoords = {this.state.draggedCoords} activeTeamCoords = {this.state.activeTeamCoords} baseUrl = {this.state.baseUrls} />:<TrCompanion publicCoords = {this.state.publicCoords} draggedCoords = {this.state.draggedCoords} setDraggedCoords = {this.setDraggedCoords} setPublicCoordsForProxies ={this.setPublicCoordsForProxies} secondaryProxy = {this.state.secondaryProxy} activeProxyZoneHandler = {this.activeProxyZoneHandler} activeProxyZone = {this.state.activeProxyZone} activeTeamCoords = {this.state.activeTeamCoords} trueCreds = {this.state.trueCreds} storeOptions = {this.state.storeOptions} setActiveCoords = {this.setActiveCoords} credentialsUrl= {this.state.baseUrls.dynamicBase3 + 'credentials'} loggedIn = {this.state.loggedIn} loggedInHandler = {this.loggedInHandler} logoutHandler = {this.logoutHandler} baseUrl = {this.state.baseUrls}  />}
                    <Footer />
                  </div>
    let managerMode = <div style={{backgroundImage:back, paddingTop: "8rem"}} className="App"><HeroDisplay addSpace baseUrl = {this.state.baseUrls.staticBase + 'billBoards/managerMode'}/></div>
    let mapCVM = <div style={{backgroundImage:back, paddingTop: "3rem"}} className="App"><MapCvm secondaryProxy = {this.state.secondaryProxy} publicCoords = {this.state.publicCoords} draggedCoords = {this.state.draggedCoords} setDraggedCoords = {this.setDraggedCoords} setPublicCoordsForProxies ={this.setPublicCoordsForProxies} activeProxyZoneHandler = {this.activeProxyZoneHandler} activeProxyZone ={this.state.activeProxyZone} activeTeam = {this.state.activeTeam} activeTeamCoords = {this.state.activeTeamCoords} loggedIn = {this.state.loggedIn} logoutHandler = {this.logoutHandler} baseUrls = {this.state.baseUrls} /></div>
    // let polygonGen = <div style={{backgroundImage:back, paddingTop: "3rem"}} className="App"><PolygonGen /></div>
    let contactUs = <div style={{backgroundImage:back, paddingTop: "8rem"}} className="App"><HeroDisplay addSpace baseUrl = {this.state.baseUrls.staticBase + 'billBoards/contactUs'}/></div>
      return (
        this.state.refBaseUrl?<BrowserRouter>
            {this.state.loading?<Loader loaded = {false} />:<Loader loaded = {true} />}
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

              <AppBar hawkClick = {this.onHawkClick} menuClick = {this.showMenuHandler} newsClick = {this.showNewsHandler} />
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


