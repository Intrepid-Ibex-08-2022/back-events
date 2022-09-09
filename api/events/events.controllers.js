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
    if(req.query.place){
        Event.find( {place: req.query.place} ,(err, found) => {
            if (!err) {
                if(req.query.tipo_event){
                    let eventFounds = found.filter( e => e.tipo_event === req.query.tipo_event);
                    res.send(eventFounds);
                } else {
                    res.send(found);
                }
            } else {
                throw err
            }
        }).clone().catch(err => console.log("Error occured, " + err));
    } else{
        Event.find( {tipo_event: req.query.tipo_event} ,(err, found) => {
            if (!err) {
                res.send(found);
            } else {
                throw err
            }
        }).clone().catch(err => console.log("Error occured, " + err));
    }
}

function postEvent(req, res) {
    console.log(req.params);
    console.log(req.body);
 
    res.send('respuesta')
}



module.exports = {getOne, getAll, getByQuery, postEvent} 