const jwt = require('jsonwebtoken');
const User = require('../users/users.model');
const Rol = require('../roles/roles.model');

async function loginUser(req, res) {
    let passwordHash = await jwt.sign({pswd : req.body.pswd}, process.env.SECRET);
    req.body.pswd = passwordHash;
    await User.findOne({email : req.body.email}).exec()
    .then( response =>  {
            let token = jwt.sign({username :response.username, email : response.email, rol : response.rol}, process.env.SECRET);
            res.send({
                user : {
                    username :response.username, email : response.email, favorites : response.favorites, 
                },
                token : token
            })
    })
    .catch(err => res.status(400).send(err));
        
}

async function authUser(req, res){
    if(req.user){
        let response = await Rol.findOne({_id: req.user.rol[0]}).exec();
        req.user.rol = response.rol;
        res.send({
            ok : true,
            user : req.user
        })      
    }
}

module.exports = {loginUser, authUser};