import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Signin.css';
import axios from 'axios';

const Signin = () => {

	const history = useNavigate();
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	async function verify(e) {
		e.preventDefault();
		try {
			axios.post("http://localhost:5000/user/fetch", {
				email, password
			})
				.then(res => {
					if (res.data.message == "no user") {
						alert("Please create an account first");
					}
					else {
						history("/Home", { state: { id: res.data.message, email: email } });
					}
				})
				.catch(e => {
					console.log(e);
					alert("Error fetching user data");
				})
		}
		catch (e) {
			console.log(e);
		}
	};

	const loginwithgoogle = () => {
		fetch("http://localhost:5000/auth/google")
			.then(response => response.json())
			.then(data => {
				if (data.user) {
					console.log(data.user);
					// Handle user data as needed
				}
			})
			.catch(error => {
				console.error('Error:', error);
			});
	}
	return (
		<div>
			<div className="login-page">
				<h1 style={{ textAlign: 'center' }}>
					Login
				</h1>
				<div className="form">
					<form className='login-form'>
						<input type='text' name='' id='' onChange={(e) => setEmail(e.target.value)} placeholder='Email id' />
						<input type='password' name='' id='' onChange={(e) => setPassword(e.target.value)} placeholder='password' />
						<button onClick={(e) => { verify(e) }}>Login</button>
						<p className='message'>Not Registerd? <a href="/signup">Create an account</a></p>
					</form>
					<button className='login-with-google-btn' onClick={loginwithgoogle}>
						Sign In With Google
					</button>
				</div>
			</div>
		</div>
	)
}

export default Signin
