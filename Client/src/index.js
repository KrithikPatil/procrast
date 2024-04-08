import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Signin from './components/signin/Signin';
import Webcam from './components/webcam/Webcam';
import Signup from './components/signin/Signup';
import App1 from './App1.js';
import Timer from "./components/timermain/Timer.js";
import Timerbreak from "./components/timermain/Timerbreak.js"
import Todo from "./components/pages/Todo.js";
import Canvas from "./components/pages/Canvas.js";
import Calendar from "./components/pages/Calendar.js"

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<React.StrictMode>
		<Router>
			<Routes>
				<Route path="/" element={<App />} />
				<Route path="/signin" element={<Signin />} />
				<Route path='/capture' element={<Webcam />} />
				<Route path="/signup" element={<Signup />} />
				<Route path="/Home" element={<App1 />} />
				<Route path="/timer" element={<Timer />} />
				<Route path="/timerbreak" element={<Timerbreak />} />
				<Route path="/canvas" element={<Canvas />} />
				<Route path="/calendar" element={<Calendar />} />
				<Route path="/todo" element={<Todo />} />
			</Routes>
		</Router>

	</React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
