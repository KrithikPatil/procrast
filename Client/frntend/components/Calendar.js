import { React, useRef, useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import AddEventModal from './AddEventModal';
import axios from 'axios';
import moment from 'moment';

export default function () {
    const [modalOpen, setModalOpen] = useState(false);
    const [events, setEvents] = useState([]);
    const calendarRef = useRef(null);

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
        try {
            await axios.post("http://localhost:8000/create-event", data.event)
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
            const response = await axios.get("http://localhost:8000/get-event");
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
