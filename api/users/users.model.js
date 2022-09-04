const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    username: String,
    email: String,
    pswd : String,
    favorites : [String]
});

const User = mongoose.model('user', UserSchema);

module.exports = User;