import React, { useState } from 'react';
import Webcam from 'react-webcam';
import './Webcam.css'
import { Link } from 'react-router-dom';

const videoConstraints = {
  width: 400,
  height: 400,
  facingMode: 'user',
};

const Profile = () => {
    
    const [picture, setPicture] = useState('');
    const [showContinueButton, setShowContinueButton] = useState(false);
    const webcamRef = React.useRef(null);
  
    const capture = React.useCallback(() => {
      const pictureSrc = webcamRef.current.getScreenshot();
      setPicture(pictureSrc);
      setShowContinueButton(true); // Show continue button after capturing
    }, []);
  
    const retake = () => {
      setPicture('');
      setShowContinueButton(false); // Hide continue button on retake
    };
  
    const continueButtonHandler = () => {
      // Handle continue button action here
      console.log("Continue button clicked!");
    };
  
    const downloadImage = () => {
      if (picture) {
        const downloadLink = document.createElement('a');
        downloadLink.href = picture;
        downloadLink.download = 'captured_image.jpg';
        downloadLink.click();
      }
    };
  
    return (
      <div>
        <h2 className="mb-5 text-center">
          React Photo Capture using Webcam Example
        </h2>
        <div className="videoCapt">
          {picture === '' ? (
            <Webcam
              audio={false}
              height={400}
              ref={webcamRef}
              width={400}
              screenshotFormat="image/jpeg"
              videoConstraints={videoConstraints}
            />
          ) : (
            <img src={picture} alt="Captured" />
          )}
        </div>
        <div className="capture-buttons">
          {picture !== '' ? (
            <div>
              <button onClick={retake} className="btn btn-primary mr-2">
                Retake
              </button>
              <button onClick={downloadImage} className="btn btn-secondary mr-2">
                Download
              </button>
              {showContinueButton && (
                <Link to ="/">
                <button onClick={continueButtonHandler} className="btn btn-success">
                  Continue
                </button>
                </Link>
               
              )}
            </div>
          ) : (
            <button onClick={capture} className="btn btn-danger">
              Capture
            </button>
          )}
        </div>
      </div>
    );
};

export default Profile;
