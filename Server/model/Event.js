import mongoose from 'mongoose';

const EventSchema=mongoose.Schema({
    email: String,
    start: Date,
    end: Date,
    title: String,
    completed: Boolean,
    todo: Boolean
})

const Event = new mongoose.model('events',EventSchema);

export default Event;