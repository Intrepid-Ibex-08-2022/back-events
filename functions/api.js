const express = require('express');
const serverless = require('serverless-http');
config = require('../config/jwt-config');
bodyparser = require('body-parser');
mongoose = require("mongoose");
usersRouter = require('../api/users/users.router');
eventsRouter = require('../api/events/events.router');
cors = require('cors');
cloudinary = require('cloudinary').v2;


const app = express();
const router = express.Router();
require('dotenv').config();

app.use(cors());
app.set('master', config.master);
app.use(bodyparser.urlencoded({extended : true}));
app.use(bodyparser.json());
router.use('/events',eventsRouter);
router.use('/users',usersRouter);

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
});

app.use('/', router);



module.exports.handler = serverless(app), router;



