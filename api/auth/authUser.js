const jwt = require('jsonwebtoken');
const User = require('../users/users.model');

function loginUser(req, res) {
    console.log("ENTRO");
    User.findOne({email : req.query.email, password: req.query.pswd })
    .then( userFound =>  {
            let token = jwt.sign({usr :userFound.email, psw : userFound.pswd}, process.env.SECRET);
            res.send({
                user : userFound,
                token : token
            })
    })
    .catch(err => console.log(err))
        
}

function authUser(req, res){
    console.log(req.user);
    if(req.user){
        res.send({
            ok : true,
            user : req.user.usr
        })
    }
}



module.exports = {loginUser, authUser};