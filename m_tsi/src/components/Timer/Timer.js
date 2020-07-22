import React, {useState, useEffect} from 'react';
import './Timer.css';


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
    <h1>Start tracker!</h1>
      <div className="time">
        {seconds}s
      </div>
      <div className="row">
        <button className={`button button-primary button-primary-${isActive ? 'active' : 'inactive'}`} onClick={toggle}>
          {isActive ? 'Pause' : 'Start'}
        </button>
        <button className="button" onClick={reset}>
          Reset
        </button>
      </div>
    </div>);


}

export default Timer;
