import express from 'express';
const getEvent = require('../middleware/getEvent');
const router = express.Router();

const Event = require('../models/event.model');

// GET all events
router.get('/', async (req, res) => {
  try {
    const events = await Event.find();
    res.json(events);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// CREATE an event
router.post('/', async (req, res) => {
  const event = new Event({
    title: req.body.title,
    description: req.body.description,
  });

  try {
    const newEvent = await event.save();
    res.status(200).json(newEvent);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// GET EVENT BY ID
router.get('/:id', getEvent, (req, res) => {
  res.json(res.event);
});

// UPDATE EVENT BY ID
router.patch('/:id', getEvent, async (req, res) => {
  if (req.body.title != null) {
    res.event.title = res.event.title;
  }
  if (req.body.description != null) {
    res.event.description = res.event.description;
  }
  try {
    const updateEvent = await res.event.save();
    res.json(updateEvent);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE EVENT BY ID
router.delete('/:id', getEvent, async (req, res) => {
  try {
    await res.event.remove();
    res.json({ message: 'event deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
