const mongoose = require("mongoose"),
Schema = mongoose.Schema;

const RolSchema = new mongoose.Schema({
    rol:{
        type: String,
        required:'Es necesario un nombre del rol',
        maxlength:[8,"El nombre de usuario debe tener un maximo de 8 caracteres"],
        minlength:[3, "El nombre de usuario debe tener un minimo de 3 caracteres"],
        unique:true
    },
    permisos: {
        type: [String],
        required:'Es necesario colocar los permisos',
        maxlength:[10,"El email tiene un maximo permitido de 10 caracteres"],
        unique:true
    },

});

const Rol = mongoose.model('rol', RolSchema);

module.exports = Rol;

