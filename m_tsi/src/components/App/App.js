import React from 'react';
import './App.css';
import Button from '../Button/Button'
import Title from '../Title/Title'
import NotifBox from '../NotifBox/NotifBox'
import Popup from 'reactjs-popup';
import Timer from '../Timer/Timer'
import badIcon from '../App/bad.png'
import goodIcon from '../App/good.png'
import warnIcon from '../App/warning.png'

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
      frequency: [],
      percentages: [],
      report: {},
      showReport: false
    };
    this.closePopUp = this.closePopUp.bind(this)
    this.toggleCollect = this.toggleCollect.bind(this)
    this.onReset = this.onReset.bind(this)
  }

  reminderLogic(topic, message){
    if(topic === 'IsitaT03/feeds/posture'){
      this.setState({postureStatus: message})

      this.setState({frequency: this.state.frequency.concat(message)})
      console.log(this.state.frequency)
      switch(message){
        case 'Warning':
          this.setState({warningCount: this.state.warningCount + 1})
          if(this.state.warningCount >= 5){
            this.setState({popUpState: true})
          }
          break;
        case 'Bad':
          this.setState({postureStatus: message, warningCount: 0, popUpState:true})

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
      if(this.state.collect){
        this.reminderLogic(topic, message)
      }
    }
  }

  toggleCollect() {
    if(this.state.showReport){
      this.setState({showReport: false, percentages: []})
    }
    this.setState({collect: !this.state.collect})

  }

  componentDidMount() {
    this.handleStream();
  }

  componentWillUnmount() {
     if(this.eventSource){
     this.eventSource.close();
     }
  }

  onReset(){
    let data = this.state.frequency
    let classes = ['Bad', 'Warning', 'Good']
    let counts = []
    for(let i=0; i<=2; i++){
      counts[i] = data.filter(c => c === classes[i]).length / data.length;
      counts[i] = Math.round((counts[i] * 100) * 10) / 10
    }
     this.setState({percentages: counts, showReport: true, collect: false, frequency: []})

  }

  closePopUp(){
    this.setState({popUpState: false})
  }

  openPopUp(){
    this.setState({popUpState: true})
  }

  stateEval(postureStatus) {
    if (this.state.postureStatus == 'Good') {
      return goodIcon;
    } else {
      if (this.state.postureStatus == 'Bad') {
        return badIcon;
      } else {
        return warnIcon;
      }
    }
  }

  render(){

    const showReport = this.state.showReport;
    let report;
    if(this.state.showReport){
      report = (
      <p> Session report: <br/> 
        'Good' posture: {this.state.percentages[2]}% <br/> 
      'Warning' posture: {this.state.percentages[1]}% <br/>
      'Bad' posture: {this.state.percentages[0]}% </p>
        )
    }

    return(
    <div className="App">
    <Title/>
      <div className="App-header">

      <Timer toggleCollect={this.toggleCollect} onReset={this.onReset}/>
      {report}
      </div>

      <div className="notifs">
        <NotifBox title="Posture" src={this.stateEval()}/>
        <NotifBox title="Stress" src={goodIcon}/>
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
