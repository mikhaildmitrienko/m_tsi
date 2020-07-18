import React from 'react';
import logo from '../../logo.svg';
import {Connector} from 'mqtt-react';
import './App.css';
import {subscribe} from 'mqtt-react';
import Button from '../Button/Button'
import Title from '../Title/Title'
import NotifBox from '../NotifBox/NotifBox'

function App() {
  return (
    <div className="App">
    <Title/>
      <div className="App-header">

      <Button/>
      </div>

      <div className="notifs">
        <NotifBox title="Posture" status="Good"/>
        <NotifBox title="Stress" status="Bad"/>

      </div> 
    </div>

  );
}

export default App;
