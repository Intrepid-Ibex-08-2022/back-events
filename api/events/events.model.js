const mongoose = require("mongoose");

const EventSchema = new mongoose.Schema({
    _id: String,
    tipo_event: String,
    place : String,
    image : String,
    title : String,
    description : String,
    date  : {
        start_date : String,
        when : String
    },
    adress : [String],
    ticket_info : String,
    venue : {
        rating : String,
        views : String
    },
    map_link : String
});

const Event = mongoose.model('event', EventSchema);

module.exports = Event;