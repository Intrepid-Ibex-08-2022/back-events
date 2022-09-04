const jwt = require('jsonwebtoken');
const Event = require('./events.model');

function getAll(req, res) {
    Event.find({}, (err, found) => {
        if (!err){
            res.send(found)
        } else {
            throw err
        }
    }).clone().catch(err => console.log("Error occured, " + err));
}

function getOne(req, res) {

    Event.findOne({_id: req.params.id} ,(err, found) => {
        if (!err) {
            res.send(found);
        } else {
            throw err
        }
    }).clone().catch(err => console.log("Error occured, " + err));
}

function getByQuery(req, res){
    Event.find( {place: req.query.place} ,(err, found) => {
        if (!err) {
            let eventFounds = found.filter( e => e.tipo_event === req.query.tipo_event);
            res.send(eventFounds);
        } else {
            throw err
        }
    }).clone().catch(err => console.log("Error occured, " + err));
}

module.exports = {getOne, getAll, getByQuery} 