import React, { useState, useEffect } from 'react';
import './breakstyle.css';


const Timerbreak = () => {
  const [minutes, setMinutes] = useState(5); // Initial timer value in minutes
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    let interval;

    if (isActive) {
      interval = setInterval(() => {
        if (seconds === 0) {
          if (minutes === 0) {
            clearInterval(interval);
            setIsActive(false);
          } else {
            setMinutes(minutes - 1);
            setSeconds(59);
          }
        } else {
          setSeconds(seconds - 1);
        }
      }, 1000);
    } else {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [isActive, minutes, seconds]);

  const handleStart = () => {
    setIsActive(true);
  };

  const handlePause = () => {
    setIsActive(false);
  };

  const handleReset = () => {
    setIsActive(false);
    setMinutes(5); // Set the initial timer value here
    setSeconds(0);
  };

  const handleEdit = (event) => {
    const value = event.target.value;
    const numericValue = parseInt(value, 10);

    if (!isNaN(numericValue) && numericValue >= 0) {
      setMinutes(numericValue);
      setSeconds(0);
    }
  };

  return (
  <body className='body2'>
    <div className='GroupTimer2'>
      <div className='Timer2'>
        <span className='minutes'>{String(minutes).padStart(2, '0')}:</span>
        <span className='seconds'>{String(seconds).padStart(2, '0')}</span>
      </div>
      <div className='edit2'>
        <label>Set Timer : </label>
        <input className='labeltimer2' type="number" value={minutes} onChange={handleEdit} />
      </div>
      <div className='StartTimer2'>
        <button className="startbutton2" onClick={handleStart}>START</button>
      </div>
      <div className='pause2'>
        <button className='pausebutton2' onClick={handlePause}>PAUSE</button>
      </div>
      <div className='reset2'>
        <button className='resetbutton2' onClick={handleReset}>RESET</button>
      </div>
      
    </div>
    </body>
  );
};

export default Timerbreak;
