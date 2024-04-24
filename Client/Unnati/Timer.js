import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./stylesheet.css";
import StickyNote from "./stickynote";
import productivityflip2 from "../images/productivityflip2.gif";
import mainbg from "../images/mainbg.jpeg";
// Import the alarm sound file (replace with your own sound file)
import alarmSound from "./alarm.wav";

const Timer = () => {
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
	// stickynote.js

	return (

		<body>


			{/* Rectangle background */}
			<div className="rectangle"></div>
			<div className="maincomp">


				<div className="tplft">
					<div className="gif">
						<img src={productivityflip2} alt="Animated GIF" className="prodgif" />
					</div>
				</div>

				<div className="btmrt">
					<div className="girl">
						<iframe
							src="https://my.spline.design/untitled-2a93085541c064e81f185cbb02eb20d2/"
							frameborder="0"
							width="700px"
							height="700px"
						></iframe>
					</div>
				</div>

				<div className="tprt">
					<div className="GroupTimer">
						{/* Timer component */}
						<div className="Timer">
							<span>{String(minutes).padStart(2, "0")}:</span>
							<span>{String(seconds).padStart(2, "0")}</span>
						</div>
						{/* Edit timer input */}
						<div className="edit">
							<label>Set Timer : </label>
							<input
								className="labeltimer"
								type="number"
								value={minutes}
								onChange={handleEdit}
							/>
						</div>
						{/* Timer control buttons */}
						<div className="cluster-btn">
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
							</div>
						</div>
						{/* Break button */}
						<div className="Break">
							<Link to="/timerbreak">
								<button className="breakbutton">BREAK</button>
							</Link>
						</div>
					</div>
				</div>

				<div className="overall">
					<div className="bk">
						<img src={mainbg} alt="Description of the image" />
					</div>
				</div>

				{/* Sticky notes */}
				<StickyNote />

			</div>

		</body>
	);
};

export default Timer;
