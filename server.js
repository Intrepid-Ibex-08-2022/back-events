const express = require('express'),
config = require('./config/jwt-config'),
bodyparser = require('body-parser'),
mongoose = require("mongoose"),
usersRouter = require('./api/users/users.router');

var app = express();
app.use(cors());
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

app.listen(process.env.PORT || 8080 , () =>{
    console.log(`El servidor esta levantado en el puerto ${process.env.PORT}`)
});

