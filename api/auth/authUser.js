const jwt = require('jsonwebtoken');
const User = require('../users/users.model');

function loginUser(req, res) {
    User.findOne({email : req.body.email, password: req.body.pswd })
    .then( userFound =>  {
            let token = jwt.sign({usr :userFound.username, mail : userFound.email, fav : userFound.favorites}, process.env.SECRET);
            res.send({
                user : {
                    usr :userFound.username, mail : userFound.email, fav : userFound.favorites
                },
                token : token
            })
    })
    .catch(err => res.status(400).send(err));
        
}

function authUser(req, res){
    if(req.user){
        res.send({
            ok : true,
            user : req.user
        })
    }
}



module.exports = {loginUser, authUser};