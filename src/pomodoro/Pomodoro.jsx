import { useEffect, useState } from "react";

import "./Pomodoro.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlay,
  faPause,
  faRotateRight,
  faEllipsis,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import "./PomodoroComponents.scss";
import focusPng from "/focus.png";
import breakPng from "/break.png";

const Pomodoro = () => {
  const [standardMinutes, setStandardMinutes] = useState(25);
  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(standardMinutes);
  const [message, setMessage] = useState(false);
  const [breaks, setBreak] = useState(standardBreak);
  const [standardBreak,setStandardBreak]=useState(5)
  // const [isBreak,setIsBreak]=useState(false)
  const [reload, setReload] = useState(false);
  const showMinutes = minutes >= 10 ? minutes : `0${minutes}`;
  const showSeconds = seconds >= 10 ? seconds : `0${seconds}`;

  const [iniciarTimer, setIniciar] = useState(false);
  const [display,setDisplay]=useState(true)

  useEffect(() => {
    if (iniciarTimer) {
      document.title = `${showMinutes}:${showSeconds}`;
      let interval = setTimeout(() => {
        if (seconds === 0) {
          if (minutes !== 0) {
            setSeconds(59);
            setMinutes(minutes - 1);
          } else {
            if (message) {
              setMessage(false);
              setMinutes(standardMinutes);
              setIniciar(!iniciarTimer);
              return 
            }
            setMessage(true);
            setMinutes(breaks);

            setSeconds(59);
          }
        } else {
          setSeconds(seconds - 1);
        }
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [seconds, iniciarTimer]);

  useEffect(() => {
    if (reload) {
      setMinutes(standardMinutes);

      setIniciar(false);

      setReload(false);
      setSeconds(0);
    }
  }, [reload]);

  useEffect(()=>{
    setBreak(breaks)
    setMinutes(standardMinutes)
  },[standardMinutes,breaks])

  return (
    <div className="pomodoroContainer">
      <h1>Pomodoro</h1>
      {message && <img src={breakPng} alt="" />}
      {!message && <img src={focusPng} alt="" />}

      <div className="controlPomodoro-timer">
        <div
          className={`clock ` + `${message ? "clock-break" : "clock-start"}`}
        >
          <div>
            <h2>
              {showMinutes}:{showSeconds}
            </h2>
          </div>
        </div>
      </div>

      <div
        className={`control-Pomodoro ${
          iniciarTimer
            ? message
              ? "break-style"
              : "focus-style"
            : message
            ? "break-style"
            : "focus-style"
        }`}
      >
        <button className="btn-weak button-pomodoro" onClick={ ()=> setDisplay(!display)} >
          <FontAwesomeIcon icon={faEllipsis} />
        </button>

        <button
          className={`button-pomodoro btn-normal`}
          onClick={() => setIniciar(!iniciarTimer)}
        >
          {iniciarTimer ? (
            <FontAwesomeIcon icon={faPause} />
          ) : (
            <FontAwesomeIcon icon={faPlay} />
          )}
        </button>

        <button
          className="btn-weak button-pomodoro"
          onClick={() => {
            setReload(true);
          }}
        >
          <FontAwesomeIcon icon={faRotateRight} />
        </button>
      </div>

      {message && <h4>Hora de descansar</h4>}
    
      <PomodoroSettings display={display} setDisplay={setDisplay} standardMinutes={standardMinutes} setStandardMinutes={setStandardMinutes} breaks={breaks} setBreak={setBreak} />
    </div>
  );
};

export default Pomodoro;

const PomodoroSettings = ({display,setDisplay,standardMinutes,setStandardMinutes,breaks,setBreak}) => {

 
  return (
    <div className={`pomodoroSettings ${display?"none":""}`} >
      <div className="first-item item">
        <h3>Configurações</h3>
        <p onClick={()=> setDisplay(!display)}><FontAwesomeIcon icon={faXmark} /></p>
      </div>
      <div className="item">
        <label htmlFor="focus-nmr"> Duração do Foco</label>
        <input type="number" min="1" max="120" name="" id="focus-nmr" value={standardMinutes}  onChange={(event)=> setStandardMinutes(event.target.value)}/>
        
        
      </div>
      <div className="item">
      <label htmlFor="pausa-nmr">Duração da Pausa</label>
      <input type="number"  min="1" max="30"  name="" id="pausa-nmr" value={breaks}  onChange={(event)=> setBreak(event.target.value)} />
      </div>

      <div className="item">
      <h4><label htmlFor="">Musica</label></h4>
      
      <input type="checkbox" name="" id="" />
      </div>

    </div>
  );
};

export {PomodoroSettings};