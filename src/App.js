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
    baseUrl: 'https://tr-episode-companion-default-rtdb.firebaseio.com/'
  }

  componentDidMount(){
    
    axios.get(this.state.baseUrl + '.json')
         .then(resp=>{
            let tempHawkPass = resp.data.hawkPassCode;
            let tempManagerPass = resp.data.managerPassCode;
            this.setState({
              hawkPassCode: tempHawkPass,
              managerPassCode: tempManagerPass,
              backImgs: resp.data.backImgs,
              newsUpdates:resp.data.newsUpdates
            })
         })
         .catch(err=>{
            alert("Network Error");
            console.log(err);
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

    let landing = <div style={{backgroundColor: "#fff", paddingTop: "3rem"}} className="App"><Landing/><Footer /></div>
    let mainApp = <div style={{backgroundImage:back}} className="App">
                    
                    
                    {this.state.hawkMode?<HawkMode/>:this.state.managerMode?<ManagerMode baseUrl = {this.state.baseUrl} />:<TrCompanion baseUrl = {this.state.baseUrl}  />}
                    <Footer />
                  </div>
    let managerMode = <div style={{backgroundImage:back, paddingTop: "8rem"}} className="App"><HeroDisplay addSpace baseUrl = {this.state.baseUrl + 'billBoards/managerMode'}/></div>
    let mapCVM = <div style={{backgroundImage:back, paddingTop: "3rem"}} className="App"><MapCvm baseUrl = {this.state.baseUrl} /></div>
    let contactUs = <div style={{backgroundImage:back, paddingTop: "8rem"}} className="App"><HeroDisplay addSpace baseUrl = {this.state.baseUrl + 'billBoards/contactUs'}/></div>
      return (
        <BrowserRouter>
            {/* If Menu or News icons are clicked they are handled here.... */}
            {this.state.showMenu?<Menu backDrop = {this.onMenuBackDrop}/>:null}
                    {this.state.showNews?<Modal show = {this.state.showNews} onBackDrop = {this.onNewsBackDrop}>
                      <h2 className='NewsHead'>Latest Updates</h2>
                      {this.state.newsUpdates.map((ele,ind)=>{
                        return(<h3 key={'NewsUpdate' + ind} style={{color:"crimson"}}>***  {ele}</h3>)
                      })}
                    </Modal>:null}
                    {/* ...And Here it Ends */}
            <div className='AppBarContainer'>
              <AppBar hawkClick = {onHawkClick} menuClick = {this.showMenuHandler} newsClick = {this.showNewsHandler} />
            </div>
            <Routes>
              <Route path='/' exact element = {landing}/>
              <Route path='/login' exact element = {mainApp}/>
              <Route path='/managerMode' exact element = {managerMode}/>
              <Route path='/mapCVM' exact element = {mapCVM}/>
            </Routes>
        </BrowserRouter>
      );
  }
}


export default App;



