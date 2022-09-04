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

function getOne(req, res){
    Event.findOne(req.body._id,(err, found) => {
        if (!err) {
            res.send(found);
        } else {
            throw err
        }
    }).clone().catch(err => console.log("Error occured, " + err));
}

module.exports = {getOne, getAll} 