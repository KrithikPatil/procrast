import { React, useRef, useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import AddEventModal from './AddEventModal';
import axios from 'axios';
import moment from 'moment';
import Modal from 'react-modal';
// import Calendar from './components/Calendar';
import 'react-datetime/css/react-datetime.css';
// import { useSearchParams } from 'react-router-dom';

Modal.setAppElement('#root');

export default function () {
    const [modalOpen, setModalOpen] = useState(false);
    const [events, setEvents] = useState([]);
    const calendarRef = useRef(null);
    const searchParams = new URLSearchParams(window.location.search);
    const email = searchParams.get("email");
    console.log(email);

    const onEventAdded = event => {
        let calendarApi = calendarRef.current.getApi();
        calendarApi.addEvent({
            start: moment(event.start).toDate(),
            end: moment(event.end).toDate(),
            title: event.title
        });
    };

    const handleCalendarReady = () => {
        console.log("Calendar is ready");
    };

    async function handleEventAdd(data) {
        console.log(data);
        try {
            await axios.post(`http://localhost:5000/create-event?email=${email}`, data.event)
            .then(() => {
                alert("Success");
            })
            .catch(err => {
                console.log(err);
                alert("error inserting");
            });
        } catch (error) {
            console.error('Error adding event:', error);
            alert('Error adding event:', error)
        }
    }

    async function handleDatesSet(data) {
        const start = moment(data.start).toDate();
        const end = moment(data.end).toDate();
        try {
            const response = await axios.post("http://localhost:5000/get-event", { email });
            setEvents(response.data);
            console.log(response.data);
        } catch (error) {
            console.error('Error fetching events:', error);
        }
    }

    return (
        <section>
            <button onClick={() => setModalOpen(true)}>Add event</button>
            <div style={{ position: "relative", zIndex: 0 }}>
                <FullCalendar
                    ref={calendarRef}
                    events={events}
                    plugins={[dayGridPlugin]}
                    initialView="dayGridMonth"
                    onReady={handleCalendarReady}
                    eventAdd={event => handleEventAdd(event)}
                    datesSet={date => handleDatesSet(date)}
                />
            </div>

            <AddEventModal isOpen={modalOpen} onClose={() => setModalOpen(false)} onEventAdded={event => onEventAdded(event)} />
        </section>
    )
}
