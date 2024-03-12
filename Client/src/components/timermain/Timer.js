// import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';

// const Timer = () => {
//   const [minutes, setMinutes] = useState(25);
//   const [seconds, setSeconds] = useState(0);
//   const [isActive, setIsActive] = useState(false);

//   useEffect(() => {
//     let interval;

//     if (isActive) {
//       interval = setInterval(() => {
//         if (seconds === 0) {
//           if (minutes === 0) {
//             clearInterval(interval);
//             setIsActive(false);

//             // Automatically start another timer (e.g., break time)
//             setMinutes(5); // Set break time to 5 minutes (adjust as needed)
//             setSeconds(0);
//             setTimeout(() => {
//               setIsActive(true);
//             }, 1000);
//           } else {
//             setMinutes(minutes - 1);
//             setSeconds(59);
//           }
//         } else {
//           setSeconds(seconds - 1);
//         }
//       }, 1000);
//     } else {
//       clearInterval(interval);
//     }

//     return () => clearInterval(interval);
//   }, [isActive, minutes, seconds]);

//   const handleStart = () => {
//     setIsActive(true);
//   };

//   const handlePause = () => {
//     setIsActive(false);
//   };

//   const handleReset = () => {
//     setIsActive(false);
//     setMinutes(25);
//     setSeconds(0);
//   };

//   const handleEdit = (event) => {
//     const value = event.target.value;
//     const numericValue = parseInt(value, 10);

//     if (!isNaN(numericValue) && numericValue >= 0) {
//       setMinutes(numericValue);
//       setSeconds(0);
//     }
//   };

//   return (
//     <div className='GroupTimer'>
//       <div className='Timer'>
//         <span>{String(minutes).padStart(2, '0')}:</span>
//         <span>{String(seconds).padStart(2, '0')}</span>
//       </div>
//       <div className='edit'>
//         <label>Set Timer : </label>
//         <input className='labeltimer' type="number" value={minutes} onChange={handleEdit} />
//       </div>
//       <div className='StartTimer'>
//         <button className="startbutton" onClick={handleStart}>START</button>
//       </div>
//       <div className='pause'>
//         <button className='pausebutton' onClick={handlePause}>PAUSE</button>
//       </div>
//       <div className='reset'>
//         <button className='resetbutton' onClick={handleReset}>RESET</button>
//       </div>
//       <div className='Break'>
//         {/* 'to' attribute should point to the correct route for the next timer */}
//         <Link to='/timerbreak'>
//           <button className="breakbutton">BREAK</button>
//         </Link>
//       </div>
//     </div>
//   );
// };

// export default Timer;

import React, { useState, useEffect } from 'react';                                 
import { Link, useLocation } from 'react-router-dom';
import './stylesheet.css'
import Tnavbar from './Tnavbar'

// Import the alarm sound file (replace with your own sound file)
import alarmSound from './alarm.wav';

const Timer = () => {

  const location = useLocation();
  const email = location.state.email;
  const displayName = location.state.id;
  console.log(email, displayName);
  const [minutes, setMinutes] = useState(25);
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);

  const alarmRef = new Audio(alarmSound);

  useEffect(() => {
    let interval;

    if (isActive) {
      interval = setInterval(() => {
        if (seconds === 0) {
          if (minutes === 0) {
            clearInterval(interval);
            setIsActive(false);
            playAlarm(); // Play the alarm when the timer ends

            // Automatically start another timer (e.g., break time)
            setMinutes(5); // Set break time to 5 minutes (adjust as needed)
            setSeconds(0);
            setTimeout(() => {
              setIsActive(true);
            }, 1000);
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
    setMinutes(25);
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

  const playAlarm = () => {
    // Play the alarm sound
    alarmRef.play();
  };

  return (
    <div className='whole-timer'>
    <Tnavbar displayName = {displayName} />
    <div className='GroupTimer'>
      
      <div className='Timer'>
        <span>{String(minutes).padStart(2, '0')}:</span>
        <span>{String(seconds).padStart(2, '0')}</span>
      </div>
      <div className='edit'>
        <label>Set Timer : </label>
        <input className='labeltimer' type="number" value={minutes} onChange={handleEdit} />
      </div>
      <div className='StartTimer'>
        <button className="startbutton" onClick={handleStart}>START</button>
      </div>
      <div className='pause'>
        <button className='pausebutton' onClick={handlePause}>PAUSE</button>
      </div>
      <div className='reset'>
        <button className='resetbutton' onClick={handleReset}>RESET</button>
      </div>
      <div className='Break'>
        {/* 'to' attribute should point to the correct route for the next timer */}
        <Link to='/timerbreak'>
          <button className="breakbutton">BREAK</button>
        </Link>
      </div>
    </div>
    </div>
  );
};

export default Timer;
