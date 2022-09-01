const express = require('express'),
config = require('./config/jwt-config'),
bodyparser = require('body-parser'),
mongoose = require("mongoose"),
usersRouter = require('./api/users/users.router');

var app = express();
require('dotenv').config();


app.set('master', config.master);
app.use(bodyparser.urlencoded({extended : true}));
app.use(bodyparser.json());
app.use('/api/users',usersRouter);

mongoose.connect(
    process.env.URL_DB, 
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
);

const PORT =  process.env.PORT || 3000;
app.listen(PORT =>{
    console.log(`El servidor esta levantado en el puerto ${PORT}`)
});

