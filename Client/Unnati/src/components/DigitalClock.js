import React, { useState, useEffect } from 'react';

const DigitalClock = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const updateClock = () => {
      setCurrentTime(new Date());
    };

    // Update the clock every second
    const intervalId = setInterval(updateClock, 1000);

    // Cleanup the interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  // Format the time to HH:mm:ss
  const formattedTime = currentTime.toLocaleTimeString([], { hour12: false });

  return (
    <div className='DC'>
      <h5>TIME: </h5>
      <p>{formattedTime}</p>
    </div>
  );
};

export default DigitalClock;