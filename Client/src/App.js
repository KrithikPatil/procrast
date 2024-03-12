
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './App.css';
import Navbar from './components/header/Navbar'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/mainPage/Home'
import Features from './components/mainPage/Features'
import TeamSection from './components/mainPage/Team';
import Footer from './components/mainPage/Footer';
function App() {

	// const location = useLocation();
	// const [displayName, setName] = useState('');
	// const [email, setEmail] = useState('');

	// useEffect(() => {
	//   if (location) {
	//     setEmail(location.state.email);
	//     setName(location.state.id);
	//   }
	// }, [location]);

	return (
		<React.StrictMode>

			<Navbar />
			<div className='home'>
				<Home />
			</div>
			<div className='Features'>
				<Features />
			</div>
			<div className='Team'>
				<TeamSection />
			</div>
			<div className='footer'>
				<Footer />
			</div>


		</React.StrictMode>


	);
}

export default App;
