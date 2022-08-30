const jwt = require('jsonwebtoken');
const User = require('./users.model');

function getAll(req, res) {
    User.find({}, (err, found) => {
        if (!err){
            res.send(found)
        } else {
            throw err
        }
    }).clone().catch(err => console.log("Error occured, " + err));
}

function getOne(req, res) {
    User.findById(req.params.id ,(err, found) => {
        if (!err) {
            res.send(found);
        } else {
            throw err
        }
    }).clone().catch(err => console.log("Error occured, " + err));
}

function postUser(req, res) {
    const usr = new User({
        username: req.body.username,
        email: req.body.email,
        pswd : req.body.pswd
    });
    usr
        .save()
        .then(
            () => res.send(usr) , 
            (err) => {throw err}
        );
}

function putUser(req, res) {
    User.findByIdAndUpdate(req.params.id, req.body, {new : true})
    .then(updated => {
        res.send(updated);
    })
    .catch(err => res.estatus(500).send(err))
}

function deleteOne(req, res) {
    User.findByIdAndRemove(req.params.id)
    .then( del => res.send({}))
    .catch(err => res.estatus(500).send(err))
}

/* const protecRoutes = express.Router();
protecRoutes.use((req, res, next) => {
    const token = req.header['access-token'];
    if (token) {
        jwt.verify(token , router.get('master'),
        (err, decoded) => {
            if (err) {
                return res.json({mensaje : 'token invalido'});
            } else {
                req.decoded = decoded;
                next();
            }
        });
    } else {
        res.send({
            mensaje : 'token no proveida'
        });
    }
})
 */
/* router.post('/auth', (req,res) => {
    if (req.body.mail === "qwerty" && req.body.psw === "123456") {
        payload = {
            check : "true"
        }
        const token = jwt.sign(payload,router.get('master'), {expiresIn : 1440});
        res.json({
            mensaje : "autentificacion correcta",
            token : token
        });
    }else {
        res.json({
            mensaje : "usuario o cntraseña incorrectos",
            token : null
        })
    }
}) */


module.exports = {deleteOne, putUser, postUser, getOne, getAll} 