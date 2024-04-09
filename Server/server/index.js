require('dotenv').config();

const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const Event = require('./models/Event');
const moment = require('moment');
const app = express();
const cors = require('cors');
app.use(bodyParser.json());
port = process.env.PORT
app.use(cors());

mongoose.connect(process.env.MONGO_URI)
    .then(() => app.listen(port, () => console.log('Database connected')))
    .catch((error) => console.log(error.message));


// app.use("/api/calendar",require("./controllers/calendarController"));
// app.post('/create-event', async(req, res) => {
//     try {
//         const event = new Event(req.body); 
//         await event.save();
//         res.sendStatus(201);
//     } catch (error) {
//         console.error('Error creating event:', error);
//         res.status(500).json({ message: 'Failed to create event' });
//     }
// });

// app.get('/get-event', async(req, res) => {
//     try {
//         // const events = await Event.find({
//         //     start: { $gte: moment(req.query.start).toDate() },
//         //     end: { $lte: moment(req.query.end).toDate() }
//         // });
//         const events =await Event.find()
//         res.send(events);
//     } catch (error) {
//         console.error('Error fetching events:', error);
//         res.status(500).json({ message: 'Failed to fetch events' });
//     }
// });
