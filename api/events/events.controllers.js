const jwt = require('jsonwebtoken'),
 Event = require('./events.model'),
 User = require('../users/users.model'),
 ObjectId = require('mongoose').Types.ObjectId,
 cloudinary = require('cloudinary').v2;


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
    console.log(req.body)
    cloudinary.uploader.upload('./public')
    .then( found => console.log(found))
    .catch(err => res.status(400).send(err));
    Event.create(req.body)
    .then(eventFound => res.send(eventFound))
    .catch(err => res.status(500).send('error: ' + err))
}

function postPrefered(req, res){
    User.findOne({email : req.user.usr})
    .then(user => {
        user.favorites.push(req.params.id);
        user.save()
        .then(() => res.send(user));
    })
    .catch(err => res.status(400).send(err));
    
}

function viewAllPreferred(req, res){
    User.find({email : req.user.usr}).populate('favorites')
    .then(userPopulated => res.send(userPopulated))
    .catch(err  => res.status(400).send(err))
}

module.exports = {getOne, getAll, getByQuery, postEvent, postPrefered, viewAllPreferred} 
