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

async function getOne(req, res) {
    let email = await User.findOne({email : req.query.email}).exec()
    console.log(email)
    await User.findOne({email : req.params.email}).exec()
    .then( response =>  {
        res.send(response)
    })
    .catch(err => res.status(400).send(err));
}

function postUser(req, res) {
    const usr = new User({
        username: req.body.username,
        email   : req.body.email,
        pswd    : req.body.pswd,
        rol     : "6410ae4fa156a1ebec6b8b11",
    });
    let token = jwt.sign({username :usr.username, email : usr.email, rol: usr.rol}, process.env.SECRET);
    let passwordHash = jwt.sign({pswd : usr.pswd}, process.env.SECRET);
    usr.pswd = passwordHash;
    usr
        .save()
        .then(
            () => res.send({
                user : 
                {
                    username :usr.username, 
                    email : usr.email, 
                    rol: "userGuest",
                    favorites : [{}]

                },
                token : token
            })
        )
        .catch(err => res.status(500).send(err))
}

async function putUser(req, res) {
    let user = await User.findOne({email : req.body.email}).exec()
    if(user){
        await User.findOneAndUpdate(
            {_id: user._id},
            {
                username  : req.body.username,
                email     : req.body.email,
                pswd      : req.body.pswd,
                rol       : req.body.rol,
                favorites : req.body.favorites
            })
        .then(() => {
            res.send({ok: true});
        })
        .catch(err => res.status(500).send(err))
    }else {
        res.status(400).send({error : "No existe un usuario con ese email"})
    }

}

async function deleteOne(req, res) {
    let user = await User.findOne({email : req.body.email}).exec()
    if(user){

        await User.findOneAndRemove({_id: user._id} ).exec()
        .then( () => res.send({deleted : "Usuario eliminado"}))
        .catch(err => res.status(500).send(err))

    } else {
        res.status(400).send({error : "No existe un usuario con ese email"})
    }
}


module.exports = {deleteOne , putUser, postUser, getOne, getAll} 