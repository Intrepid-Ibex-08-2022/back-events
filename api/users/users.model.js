const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    username:{
        type: String,
        required:'Es necesario un nombre de usuario',
        maxlength:[8,"El nombre de usuario debe tener un maximo de 8 caracteres"],
        minlength:[3, "El nombre de usuario debe tener un minimo de 3 caracteres"],
        unique:true
    },
    email: {
        type: String,
        required:'Es necesario un email',
        maxlength:[30,"El email tiene un maximo permitido de 30 caracteres"],
        unique:true
    },
    pswd : {
        type: String,
        required:'Es necesario una contraseña',
        minlength:[6, "La contraseña debe tener un minimo de 6 caracteres"]
    },
    favorites : [String]
});

const User = mongoose.model('user', UserSchema);

module.exports = User;