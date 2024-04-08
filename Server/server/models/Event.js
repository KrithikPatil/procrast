const mongoose =require('mongoose');

const EventSchema=mongoose.Schema({
    start: Date,
    end: Date,
    title: String
})

const Event= mongoose.model('events',EventSchema);

module.exports = Event