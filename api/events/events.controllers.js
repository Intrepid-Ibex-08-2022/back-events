const jwt = require('jsonwebtoken');
const User = require('./events.model');

function getAll(req, res) {
    User.find({}, (err, found) => {
        if (!err){
            res.send(found)
        } else {
            throw err
        }
    }).clone().catch(err => console.log("Error occured, " + err));
}



module.exports = { getAll} 