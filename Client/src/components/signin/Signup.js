import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Signup.css';
import axios from 'axios';
const Signup = () => {

    const [email, setEmail] = useState('');
    const [displayName, setUser] = useState('');
    const [password, setPasswd] = useState('');
    const history = useNavigate();

    async function insert(e) {
        e.preventDefault();
        if (email && password && displayName) {
            if (!/.+@gmail\.com/.test(email)) {
                alert("Enter valid email id");
                return false;
            }
            try {
                const res = await axios.post("http://localhost:5000/user/insert", {
                    displayName, email, password
                });
                console.log(res);
                if (res.data.message === "exists") {
                    alert("User already exists");
                }
                else {
                    history("/capture", { state: { id: displayName, email: email } });
                }
            } catch (error) {
                // Handle request failure
                console.error("Error inserting the data:", error);
                alert("Error inserting the data");
            }
        }
        else {
            alert("Please fill all the details");
            return false;
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
                    <button className="reg-button" onClick={(e) => {insert(e)}}>Register</button>
                </form>
                <p className="reg-message">Already registered? <a href="/signin" className="reg-link">Sign in here</a></p>
            </div>
        </div>
    );
}

export default Signup;
