const jwt = require('jsonwebtoken'),
  Event = require('./events.model'),
  User = require('../users/users.model'),
  ObjectId = require('mongoose').Types.ObjectId,
  cloudinary = require('cloudinary').v2;
const fs = require('fs-extra');

function getAll(req, res) {
  let paginNum = req.query.page;
  Event.find({}, (err, found) => {
    if (!err) {
      if (paginNum) {
        let paginatedEvents = [];
        found.forEach((event, index) => {
          if (index >= paginNum * 10 - 11 && index <= paginNum * 12 - 1) {
            paginatedEvents.push(event);
          }
        });
        res.send(paginatedEvents);
      } else {
        res.send(found);
      }
    } else {
      throw err;
    }
  })
    .clone()
    .catch((err) => console.log('Error occured, ' + err));
}

async function getOne(req, res) {
  console.log(req.query.event);
  await Event.findOne({ _id: req.query.event }).exec()
  .then((response) => {
    console.log(response);
    res.send(response);
  });


}

function getByQuery(req, res) {
  if (req.query.place) {
    Event.find({ place: req.query.place }, (err, found) => {
      if (!err) {
        if (req.query.tipo_event) {
          let eventFounds = found.filter(
            (e) => e.tipo_event === req.query.tipo_event,
          );
          res.send(eventFounds);
        } else {
          res.send(found);
        }
      } else {
        throw err;
      }
    })
      .clone()
      .catch((err) => console.log('Error occured, ' + err));
  } else {
    Event.find({ tipo_event: req.query.tipo_event }, (err, found) => {
      if (!err) {
        res.send(found);
      } else {
        throw err;
      }
    })
      .clone()
      .catch((err) => console.log('Error occured, ' + err));
  }
}

function postEvent(req, res) {
  let evento;
  fs.recurse(
    './public',
    ['*.jpg', '*.png'],
    async function (filepath, relative, filename) {
      if (filename) {
        await cloudinary.uploader
          .upload(`./public/${filename}`)
          .then((found) => {
            if (found) {
              req.body.image = found.url;
              evento = {
                tipo_event: req.body.tipo_event,
                place: req.body.place,
                image: req.body.image,
                title: req.body.title,
                ticket_info: req.body.ticket_info,
                description: req.body.description,
                date: {
                  start_date: req.body.start_date,
                  when: req.body.when,
                },
                adress: req.body.adress,
                venue: {
                  rating: '0',
                  views: '0',
                },
                map_link: req.body.map_link,
              };
            }
          })
          .catch((err) => res.status(400).send(err));

        Event.create(evento)
          .then((eventFound) => res.send(eventFound))
          .catch((err) => res.status(400).send(err));
      }
    },
  );
}

function postPrefered(req, res) {
  User.findOne({ email: req.user.mail })
    .then((user) => {
      //coment prueb
      //antes de post se deberia comprobar si existe 
      if (!user.favorites.includes(req.params.id)) {
        user.favorites.push(req.params.id);
      }
      user.save().then(() => res.send(user));
    })
    .catch((err) => res.status(400).send(err));
}
function delPrefered(req, res) {
  User.findOne({ email: req.user.mail })
    .then((user) => {
      // user.favorites = user.favorites.filter((e) => !e.equals(req.params.id));
      user.favorites = user.favorites.filter((e) => e + '' !== req.params.id);

      user.save().then(() => res.send(user));
    })
    .catch((err) => res.status(400).send(err));
}

function viewAllPreferred(req, res) {
  User.find({ email: req.user.mail })
    .populate('favorites')
    .then((userPopulated) => res.send(userPopulated[0]))
    .catch((err) => res.status(400).send(err));
}

module.exports = {
  getOne,
  getAll,
  getByQuery,
  postEvent,
  postPrefered,
  delPrefered,
  viewAllPreferred,
};
