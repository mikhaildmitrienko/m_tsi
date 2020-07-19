import React, { useEffect } from 'react';
import logo from '../../logo.svg';
import {Connector} from 'mqtt-react';
import './App.css';
import {subscribe} from 'mqtt-react';
import Button from '../Button/Button'
import Title from '../Title/Title'
import NotifBox from '../NotifBox/NotifBox'

var StringDecoder = require('string_decoder').StringDecoder;


class App extends React.Component {

  constructor(props){
    super(props)
    this.eventSource = new EventSource(`http://localhost:5000/feed`);
    this.state = {
      postureStatus: 'Good',
      stressStatus: 'Good',
    };
  }

  handleStream() {
    this.eventSource.onmessage = e =>{ 
      let responseJSON = JSON.parse(e.data);
      let topic = Buffer.from(responseJSON['topic']).toString()
      let message = Buffer.from(responseJSON['message']).toString()

      if(topic === 'mdmit/feeds/test_feed'){
        if(this.state.postureStatus != message){
        this.setState({postureStatus: message})
        }
      }else if(topic === 'mdmit/feeds/test_feed2'){
        if(this.state.stressStatus != message){
        this.setState({stressStatus: message})
        }
      }
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


  render(){
    return(

    <div className="App">
    <Title/>
      <div className="App-header">

      <Button/>
      </div>

      <div className="notifs">
        <NotifBox title="Posture" status={this.state.postureStatus}/>
        <NotifBox title="Stress" status={this.state.stressStatus}/>
      </div> 
    </div>)
  }
  

}

export default App;
