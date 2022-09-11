const jwt = require('jsonwebtoken');
const User = require('../users/users.model');


function authUser(req, res) {
    User.findOne({email : req.body.email, password: req.body.password })
    .then( userFound =>  {
            let token = jwt.sign({usr :userFound.email, psw : userFound.pswd}, process.env.SECRET);
            res.send({
                user : userFound,
                token : token
            })
    })
    .catch(err => console.log(err))
        
}

module.exports = authUser;