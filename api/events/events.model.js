const mongoose = require("mongoose");

const EventSchema = new mongoose.Schema({
    tipo_event: {
        type: String,
        required:'Es necesario un tipo de evento'
    },
    place : {
        type : String,
        required:'Es necesario un lugar para el evento'
    },
    image : {
        type : String
    },
    title : {
        type : String,
        required:'Es necesario un titulo de evento'
    },
    description : {
        type : String,
        required:'Es necesario una descripcion de evento'
    },
    date  : {
        start_date : {
            type : String,
            required:'Es necesario una fecha de comienzo de evento'
        },
        when : String
    },
    adress : [String],
    ticket_info : {
        type : String,
        required:'Es necesaria la informacion del ticket de evento'
    },
    venue : {
        rating : String,
        views : String
    },
    map_link : {
        type : String,
        required:'Es necesario una posicion en el mapa para el evento'
    }
});

const Event = mongoose.model('event', EventSchema);

module.exports = Event;