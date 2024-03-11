import React, { useState } from 'react';
import './Signup.css';
import axios from 'axios';
const Signup = () => {

    const [email, setEmail] = useState('');
    const [username, setUser] = useState('');
    const [password, setPasswd] = useState('');

    async function check() {
        if (email && password && username) {
            if (!/.+@gmail\.com/.test(email)) {
                alert("Enter valid email id");
                insert();
            }
        }
        else {
            alert("Please fill all the details");
        }
    }

    async function insert() {
        try {
            const response = await axios.post("http://localhost:5000/user/insert", {
                displayName: username,
                email: email,
                password: password
            });
            if (response.data === "exists") {
                alert("User already exists");
            } else {
                // Handle successful insertion
                alert("User inserted successfully");
            }
        } catch (error) {
            // Handle request failure
            console.error("Error inserting the data:", error);
            alert("Error inserting the data");
        }
    }
    return (
        <div className="reg-page">
            <div className="reg-container">
                <h1 className="reg-heading">Register</h1>
                <form className="reg-form">
                    <input type="email" placeholder="Email" onChange={(e) => { setEmail(e.target.value) }} className="reg-input" />
                    <input type="text" placeholder="Username" onChange={(e) => { setUser(e.target.value) }} className="reg-input" />
                    <input type="password" placeholder="Password" onChange={(e) => { setPasswd(e.target.value) }} className="reg-input" />
                    <button className="reg-button" onClick={check}>Register</button>
                </form>
                <p className="reg-message">Already registered? <a href="/signin" className="reg-link">Sign in here</a></p>
            </div>
        </div>
    );
}

export default Signup;
