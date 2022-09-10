const jwt = require('jsonwebtoken');
const User = require('../users/users.model');


function authUser(req, res) {
    return User.findOne({email : req.body.email, password: req.body.password })
        .then( userFound =>  {
            console.log(userFound);
                let token = jwt.sign({usr :userFound.email, psw : userFound.pswd}, process.env.SECRET);
                req.token = token;
                console.log("found!!!!!");
                res.send({
                    user : userFound,
                    token : token
                })
        })
        
}

module.exports = authUser;