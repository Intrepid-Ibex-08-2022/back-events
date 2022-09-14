const jwt = require('jsonwebtoken');
const User = require('./users.model');

function getAll(req, res) {
    User.find({}, (err, found) => {
        if (!err){
            res.send(found)
        } else {
            throw err
        }
    }).clone().catch(err => res.status(500).send(err));
}

function getOne(req, res) {
    User.findOne({email : req.params.email} ,(err, found) => {
        if (!err) {
            res.send(found);
        } else {
            throw err
        }
    }).clone().catch(err => res.status(500).send(err));
}

function postUser(req, res) {
    const usr = new User({
        username: req.body.username,
        email: req.body.email,
        pswd : req.body.pswd
    });
    let token = jwt.sign({usr :userFound.email, mail : userFound.email, fav : userFound.favorites}, process.env.SECRET);
    usr
        .save()
        .then(
            () => res.send({
                user : usr,
                token : token
            }) , 
            (err) => { res.status(500).send(err)}
        );
}

function putUser(req, res) {
    User.findOneAndUpdate({email : req.params.email} , req.body, {new : true})
    .then(updated => {
        res.send(updated);
    })
    .catch(err => res.status(500).send(err))
}

function deleteOne(req, res) {
    User.findOneAndDelete({email : req.params.email} )
    .then( del => res.send({}))
    .catch(err => res.status(500).send(err))
}


module.exports = {deleteOne , putUser, postUser, getOne, getAll} 