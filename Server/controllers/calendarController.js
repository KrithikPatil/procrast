const router = require('express').Router();
const moment = require('moment');
const Event = require('../model/Event');

// router.post('/create-event', async(req, res) => {
//     try {
//         const event = new Event(req.body); 
//         await event.save();
//         res.sendStatus(201);
//     } catch (error) {
//         console.error('Error creating event:', error);
//         res.status(500).json({ message: 'Failed to create event' });
//     }
// });

// router.get('/get-event', async(req, res) => {
//     try {
//         const events = await Event.find({
//             start: { $gte: moment(req.query.start).toDate() },
//             end: { $lte: moment(req.query.end).toDate() }
//         });
//         res.send(events);
//     } catch (error) {
//         console.error('Error fetching events:', error);
//         res.status(500).json({ message: 'Failed to fetch events' });
//     }
// });

module.exports = router;
