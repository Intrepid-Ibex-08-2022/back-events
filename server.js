const express = require('express'),
config = require('./config/jwt-config'),
bodyparser = require('body-parser'),
mongoose = require("mongoose"),
usersRouter = require('./api/users/users.router'),
eventsRouter = require('./api/events/events.router'),
cors = require('cors'),
cloudinary = require('cloudinary').v2;

var app = express();

require('dotenv').config();

app.use(cors());
app.set('master', config.master);
app.use(bodyparser.urlencoded({extended : true}));
app.use(bodyparser.json());
app.use('/api/events',eventsRouter);
app.use('/api/users',usersRouter);

mongoose.connect(
    process.env.URL_DB, 
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
);

cloudinary.config({ 
    cloud_name: process.env.CLOUD_NAME, 
    api_key: process.env.API_KEY, 
    api_secret: process.env.API_SECRET,
    secure: true
  })

app.listen(process.env.PORT || 8080 , () =>{
    console.log(`El servidor esta levantado en el puerto ${process.env.PORT}`)
});

