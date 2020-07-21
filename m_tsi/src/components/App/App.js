import React from 'react';
import './App.css';
import Button from '../Button/Button'
import Title from '../Title/Title'
import NotifBox from '../NotifBox/NotifBox'
import Popup from 'reactjs-popup';
import Timer from '../Timer/Timer'

require('dotenv').config({path: '../.env'});

class App extends React.Component {

  constructor(props){
    super(props)
    this.eventSource = new EventSource(`http://localhost:5000/feed`);
    this.state = {
      collect: false,
      postureStatus: 'Good',
      stressStatus: 'Good',
      warningCount: 0,
      popUpState: false,
      frequencyCount: []
    };
    this.closePopUp = this.closePopUp.bind(this)
  }

  reminderLogic(topic, message){
    if(topic === 'IsitaT03/feeds/posture'){
      this.setState({postureStatus: message})

      switch(message){
        case 'Warning':
          this.setState({warningCount: this.state.warningCount + 1})
          if(this.state.warningCount >= 5){
            this.setState({popUpState: true})
          }
          break;
        case 'Bad':
          this.setState({postureStatus: message, warningCount: 0, popUpState:true})
          // alert('Lean back, your posture is really bad')

          break;
        case 'Good':
          this.setState({warningCount: 0})
          break;
        }

    }else if(topic === 'mdmit/feeds/test_feed2'){

      let previousState = this.state.stressStatus;
      switch(message){
        default: 
          this.setState({stressStatus: message})
          console.log('Here')
          break;
        case 'Bad':
          this.setState({stressStatus: message});
          if(previousState === 'Bad'){
            alert('Take a breather')
          }
      }
      
    }
  }

  handleStream() {
    this.eventSource.onmessage = e =>{ 
      let responseJSON = JSON.parse(e.data);
      let topic = Buffer.from(responseJSON['topic']).toString()
      let message = Buffer.from(responseJSON['message']).toString()
      this.reminderLogic(topic, message)
    }
  }

  toggleCollect() {
    if(this.state.collect === false){
      this.setState({collect: true})
    }else{
      this.setState({collect: false})
    }
  }



  componentDidMount() {
    this.handleStream()

  }

  componentWillUnmount() {
     if(this.eventSource){
     this.eventSource.close();
     }
  }


  closePopUp(){
    this.setState({popUpState: false})
  }

  openPopUp(){
    this.setState({popUpState: true})
  }

  render(){

    return(

    <div className="App">
    <Title/>
      <div className="App-header">

      <Timer/>
      </div>

      <div className="notifs">
        <NotifBox title="Posture" status={this.state.postureStatus}/>
        <NotifBox title="Stress" status={this.state.stressStatus}/>
      </div> 


        <Popup open={this.state.popUpState} modal onClose={this.closePopUp}>
        <h1>Energize!</h1>
        <h2>You've been sitting for a while now, <br/> so let's energize!</h2>
        
        <h3>Please roll your neck for <em> 5 minutes</em></h3>
      </Popup>


    </div>)
  }
  
}

export default App;
