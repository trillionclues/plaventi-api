// middleware for event id routes
const SingleEvent = require('../models/event.model');

async function getEvent(req, res, next) {
  let event;

  try {
    event = await SingleEvent.findById(req.params.id);
    if (event == null) {
      return res.status(404).json({ message: 'Event not found!' });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.event = event;
  next();
}

module.exports = getEvent;
