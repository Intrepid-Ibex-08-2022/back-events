const jwt = require('jsonwebtoken');
const Rol = require('./roles.model');

function getAll(req, res) {
    Rol.find({}, (err, found) => {
        if (!err){
            res.send(found)
        } else {
            throw err
        }
    }).clone().catch(err => res.status(500).send(err));
}

function getOne(req, res) {
    Rol.findOne({rol : req.params.rol} ,(err, found) => {
        if (!err) {
            res.send(found);
        } else {
            throw err
        }
    }).clone().catch(err => res.status(500).send(err));
}

function postRol(req, res) {
    const rol = new Rol({
        rol: req.body.rol,
        permisos: req.body.permisos
    });
    Rol.findOne({rol : req.params.rol} ,(err, found) => {
        if (err) {
            rol
            .save()
            .then(
                () => res.send(rol)
            );
        } else {
            throw {error : "Ya existe un rol con ese nombre"}
        }
    }).clone().catch(error => res.status(500).send(error));
}

function putRol(req, res) {
    Rol.findOneAndUpdate({rol : req.params.rol} , req.body, {new : true})
    .then(updated => {
        res.send(updated);
    })
    .catch(err => res.status(500).send(err))
}

function deleteOne(req, res) {
    Rol.findOneAndDelete({rol : req.params.rol} )
    .then( del => res.send({}))
    .catch(err => res.status(500).send(err))
}


module.exports = {deleteOne , putRol, postRol, getOne, getAll} 