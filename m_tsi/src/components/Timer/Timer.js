import React, {useState, useEffect} from 'react';
import './Timer.css';
import Button from '../Button/Button';
import playImage from '../Button/play.png'
import pauseImage from '../Button/pause.png'

const Timer = (props) => {

    const [seconds, setSeconds] = useState(0);
    const [secondsTens, setSecondsTens] = useState(0);
    const [minutes, setMinutes] = useState(0);
    const [minutesTens, setMinutesTens] = useState(0);
    const [hours, setHours] = useState(0);
    const [hoursTens, setHoursTens] = useState(0);



    const [isActive, setIsActive] = useState(false);

    function toggle(){
        setIsActive(!isActive);
        props.toggleCollect()
    }

    function reset(){
        setSeconds(0)
        setSecondsTens(0)
        setMinutes(0)
        setMinutesTens(0)
        setHours(0)
        setHoursTens(0)

        setIsActive(false);
        props.onReset();
    }

    useEffect(() => {
        let interval = null;
        if (isActive) {
          interval = setInterval(() => {
            setSeconds(seconds + 1);
            if(seconds === 9){
                setSeconds(0);
                setSecondsTens(secondsTens + 1)
            }
            if((secondsTens * 10) + seconds === 59){
                setSecondsTens(0);
                setMinutes(minutes + 1)
            }

            if(minutes === 9){
                setMinutes(0)
                setMinutesTens(minutesTens + 1)
            }
            if((minutesTens * 10) + minutes === 59){
                setMinutesTens(0)
                setHours(hours + 1)
            }

            if(hours === 9){
                setHours(0)
                setHoursTens(hoursTens + 1)
            }
            if((hoursTens * 10) + hours === 99){
                setSeconds(0)
                setSecondsTens(0)
                setMinutes(0)
                setMinutesTens(0)
                setHours(0)
                setHoursTens(0)
            }
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
    {hoursTens}{hours}:{minutesTens}{minutes}:{secondsTens}{seconds}
      </div>
      <div className="row">
      {isActive ?  <Button src={pauseImage} onClick={toggle}>
        </Button> : <div><Button src={playImage} onClick={toggle}></Button><button className="button" onClick={reset}>
          Finish session
      </button> </div> }
        
      </div>
    </div>);
}

export default Timer;
