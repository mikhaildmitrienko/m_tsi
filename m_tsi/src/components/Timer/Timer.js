import React, {useState, useEffect} from 'react';
import './Timer.css';
import Button from '../Button/Button';
import playImage from '../Button/play.png'
import pauseImage from '../Button/pause.png'

const Timer = (props) => {

    const [seconds, setSeconds] = useState(0);
    const [isActive, setIsActive] = useState(false);

    function toggle(){
        setIsActive(!isActive)
    }

    function reset(){
        setSeconds(0);
        setIsActive(false);
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
    <h1>Start tracker!</h1>
      <div className="time">
        {seconds}s
      </div>
      <div className="row">
      {isActive ?<Button src={pauseImage} onClick={toggle}>
        </Button> : <Button src={playImage} onClick={toggle}></Button>}
        <button className="button" onClick={reset}>
          Reset
      </button>
      </div>
    </div>);
}

export default Timer;
