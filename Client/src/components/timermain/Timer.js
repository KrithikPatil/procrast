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

import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
// import './stylesheet.css';

// Import the alarm sound file (replace with your own sound file)
import alarmSound from "./alarm.wav";
import gameboy from '../images/gameboy.png';
import { ImageCapture } from 'image-capture';
import AWS from 'aws-sdk';

const Timer = (items) => {
	const [minutes, setMinutes] = useState(25);
	const [seconds, setSeconds] = useState(0);
	const [isActive, setIsActive] = useState(false);
	const videoRef = useRef(null);
	const name = items.displayName;
	const email = items.email;
	const history = useNavigate();

	const [mediaStream, setMediaStream] = useState(null);

	const alarmRef = new Audio(alarmSound);

	const config = {
		bucketName: process.env.REACT_APP_BUCKET_NAME,
		region: process.env.REACT_APP_REGION,
		accessKeyId: process.env.REACT_APP_ACCESS,
		secretAccessKey: process.env.REACT_APP_SECRET
	}

	const captureFrameAsJPEG = async () => {
		console.log("Inside captureFrameAsJPEG");
		console.log(mediaStream);
		try {
			if (mediaStream) { // Add a conditional check here
				const videoTrack = mediaStream.getVideoTracks()[0];
				const imageCapture = new ImageCapture(videoTrack);
	
				const imageBitmap = await imageCapture.grabFrame();
	
				const canvas = document.createElement('canvas');
				canvas.width = imageBitmap.width;
				canvas.height = imageBitmap.height;
				const ctx = canvas.getContext('2d');
				ctx.drawImage(imageBitmap, 0, 0);
	
				// Convert canvas content to Blob
				const blob = await new Promise(resolve => canvas.toBlob(resolve, 'image/jpeg'));
	
				// Read Blob as ArrayBuffer
				const arrayBuffer = await blob.arrayBuffer();
	
				// Convert ArrayBuffer to Uint8Array
				const uint8Array = new Uint8Array(arrayBuffer);
	
				AWS.config.update({
					accessKeyId: config.accessKeyId,
					secretAccessKey: config.secretAccessKey,
					region: config.region,
				});
	
				const rekognition = new AWS.Rekognition();
				const dynamodb = new AWS.DynamoDB();
	
				const rekognitionResponse = await rekognition.searchFacesByImage({
					CollectionId: 'famouspersons',
					Image: { Bytes: uint8Array },
				}).promise();
	
				// Process Rekognition response here
				if (rekognitionResponse.FaceMatches.length > 0) {
					const faceId = rekognitionResponse.FaceMatches[0].Face.FaceId;
	
					// Query DynamoDB to get information about the recognized face
					const dynamodbResponse = await dynamodb.getItem({
						TableName: 'facerecognition',
						Key: { RekognitionId: { S: faceId } },
					}).promise();

					console.log(dynamodbResponse);
	
					if (dynamodbResponse.Item) {
						const fullName = dynamodbResponse.Item.FullName.S;
						console.log(fullName);
						if (fullName != name) {
							// setAlert(true);
							// setMessage("Different person detected");
							alert("Different person detected");
						}
						// setRecognizedPerson(fullName);
					}
					else {
						// setAlert(true);
						// setMessage("Different person detected");
						alert("Person not in dynamoDB");
						// setRecognizedPerson('Person cannot be recognized');
					}
				}
				else {
					// setAlert(true);
					// setMessage("No person detected");
					alert("No person detected");
					// setRecognizedPerson('Person cannot be recognized');
				}
			} else {
				console.log("Media stream is null");
			}
		} catch (error) {
			// setAlert(true);
			// setMessage("No person detected");
			// alert("Malicious activity4 detected");
			// console.error('Error capturing frame or calling Rekognition API:', error);
			alert("No person detected");
		}
	};

	// This useEffect is used to set a 3 second interval for sending frames to AWS Rekognition
	useEffect(() => {
		const interval = setInterval(() => {
			if (isActive && mediaStream) {
				console.log("Inside if");
				captureFrameAsJPEG();
			}
		}, 3000);
	
		return () => clearInterval(interval);
	}, [isActive, mediaStream]);

	/*--------------------------------------------------------------------*/

	useEffect(() => {
		let interval;

		if (isActive) {
			interval = setInterval(() => {
				console.log(mediaStream);
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
		if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
			navigator.mediaDevices.getUserMedia({ video: true })
				.then(stream => {
					// mediaStream = stream;
					setMediaStream(stream);
					console.log(mediaStream);
					// videoRef.current.srcObject = stream;
					captureFrameAsJPEG();
				})
				.catch(error => console.error('getUserMedia error:', error));
		}
	};

	const handlePause = () => {
		console.log(mediaStream);
		if (mediaStream) {
			mediaStream.getTracks().forEach(track => {
				try {
					track.stop();
					console.log("ended");

					// Check if the track is already ended
					if (track.readyState === 'ended') {
						console.log('Webcam has stopped (track was already ended)');
					} else {
						// Attach onended event handler
						track.onended = () => {
							console.log('Webcam has stopped');
						};
					}
				} catch (error) {
					console.log('Error stopping track:', error);
				}
			});

			setMediaStream(null);
		}
		setIsActive(false);
	};

	const handleReset = () => {
		setIsActive(false);
		setMinutes(25);
		setSeconds(0);
	};

	const handleStop = () => {
		console.log(mediaStream);
		if (mediaStream) {
			mediaStream.getTracks().forEach(track => {
				try {
					track.stop();
					console.log("ended");

					// Check if the track is already ended
					if (track.readyState === 'ended') {
						console.log('Webcam has stopped (track was already ended)');
					} else {
						// Attach onended event handler
						track.onended = () => {
							console.log('Webcam has stopped');
						};
					}
				} catch (error) {
					console.log('Error stopping track:', error);
				}
			});

			setMediaStream(null);
		}
		setIsActive(false);
		history("/dashboard", { state: { id: name, email: email }});
	}

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
		<body className="body-cls">
			{/* <video ref={videoRef} autoPlay></video> */}

			<div className="girl">
				<iframe src='https://my.spline.design/untitled-2a93085541c064e81f185cbb02eb20d2/' frameborder='0' width='700px' height='700px'></iframe>
			</div>
			<div className="Gameboy">
				<img src={gameboy} alt="Gameboy" />
			</div>
			<div className="GroupTimer">
				<div className="Timer">
					<span>{String(minutes).padStart(2, "0")}:</span>
					<span>{String(seconds).padStart(2, "0")}</span>
				</div>
				<div className="edit">
					<label>Set Timer : </label>
					<input
						className="labeltimer"
						type="number"
						value={minutes}
						onChange={handleEdit}
					/>
				</div>
				<div className="StartTimer">
					<button className="startbutton" onClick={handleStart}>
						START
					</button>
				</div>
				<div className="pause">
					<button className="pausebutton" onClick={handlePause}>
						PAUSE
					</button>
				</div>
				<div className="reset">
					<button className="resetbutton" onClick={handleReset}>
						RESET
					</button>
					<button className="resetbutton" onClick={handleStop}>
						STOP
					</button>
					
				</div>
				<div className="Break">
					{/* 'to' attribute should point to the correct route for the next timer */}
					<Link to="/timerbreak">
						<button className="breakbutton">BREAK</button>
					</Link>
				</div>
			</div>

		</body>
	);
};

export default Timer;