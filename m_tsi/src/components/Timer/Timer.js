import React, {useState, useEffect} from 'react';
import './Timer.css';
import Button from '../Button/Button';
import playImage from '../Button/play.png'
import pauseImage from '../Button/pause.png'
import endImage from '../Timer/end_sess (2).png'

const Timer = (props) => {

    const [seconds, setSeconds] = useState(0);
    const [isActive, setIsActive] = useState(false);

    function toggle(){
        setIsActive(!isActive);
        props.toggleCollect()
    }

    function reset(){
        setSeconds(0);
        setIsActive(false);
        props.onReset();
    }

    useEffect(() => {
        let interval = null;
        if (isActive) {
          interval = setInterval(() => {
            setSeconds(seconds => seconds + 1);
          }, 1000);
        } else if (!isActive && seconds !== 0) {
          clearInterval(interval);
        }
        return () => clearInterval(interval);
      }, [isActive, seconds]);

    return(
    <div className="app">
    
    {isActive ? <h1></h1>:  <h1>Start your session!</h1>}
   
      
      <div className="time">
        {seconds}s
      </div>
      <div className="row">
      {isActive ?  <Button src={pauseImage} onClick={toggle}>
        </Button> : <div><Button src={playImage} onClick={toggle}></Button>
        <Button id="end-button" onClick={reset} src={endImage}>
      </Button> </div> }
        
      </div>
    </div>);
}

export default Timer;
