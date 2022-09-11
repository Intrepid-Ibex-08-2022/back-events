const jwt = require('jsonwebtoken');
const Event = require('./events.model');

function getAll(req, res) {
  Event.find({}, (err, found) => {
    if (!err) {
      res.send(found);
    } else {
      throw err;
    }
  })
    .clone()
    .catch((err) => console.log('Error occured, ' + err));
}

function getOne(req, res) {
  Event.findOne(req.params._id, (err, found) => {
    if (!err) {
      res.send(found);
    } else {
      throw err;
    }
  })
    .clone()
    .catch((err) => console.log('Error occured, ' + err));
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
function getByQuery(req, res) {
  if (typeof req.query.ids !== undefined) {
    EventsModel.find({ _id: { $in: { _id: req.query.ids } } }, { _id: 0 });
    then(res.Event);
    // db.inventory.find({ _id: { $in: [5, 15] } }, { _id: 0 }});
  } else {
    EventsModel.find();
  }
}

function putEvent(req, res) {
  Event.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then((updated) => {
      res.send(updated);
    })
    .catch((err) => res.estatus(500).send(err));
}

module.exports = { getOne, getAll, getByQuery, putEvent };
