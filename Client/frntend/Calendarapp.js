import React from 'react';
import './App.css';
import Modal from 'react-modal';
import Calendar from './components/Calendar';
import 'react-datetime/css/react-datetime.css';

Modal.setAppElement('#root')

function App() {
  return (
    <Calendar />
  );
}

export default Calendarapp;
