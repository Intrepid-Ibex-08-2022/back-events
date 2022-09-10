const jwt = require('jsonwebtoken');
const User = require('../users/users.model');


async function authUser(req, res) {
    return User.findOne({email : req.body.email, password: req.body.password })
        .then( userFound =>  {
            console.log(userFound);
            if(userFound !== null){
                let token = jwt.sign({usr :userFound.email, psw : userFound.pswd}, process.env.SECRET);
                res.send({
                    user : userFound,
                    token : token
                })
            }else{
                res.status(401).send('No existe el usuario')
            }
        })
        .catch( err => {
            return res.status(401).send('No existe el usuario')
        })
}

module.exports = authUser;