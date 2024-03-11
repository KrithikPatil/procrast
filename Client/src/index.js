import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Signin from './components/signin/Signin';
import Webcam from './components/webcam/Webcam';
import Signup from './components/signin/Signup';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
     <Router>
       <Routes>
         <Route path="/" element={<App />} />
         <Route path="/signin" element={<Signin />} />
         <Route path='/capture' element={<Webcam />}/>
         <Route path="/signup" element={<Signup />} />
       </Routes>
     </Router>

  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
