'use strict';

const express = require('express');
const router = express.Router();

const Event = require('../models/Event');
const User = require('../models/User');

/* GET home page. */
/* router.post('/events', async (req, res, next) => {
  const { title, location, date, duration, attendees, description, menu } = req.body;
  try {
    const event = await Event.create({
      title,
      location,
      date,
      duration,
      attendees,
      description,
      menu
    });
    const eventId = event._id;
    const userId = req.session.currentUser._id;
    await User.findByIdAndUpdate(userId, { $push: { events: eventId } });
    res.json(event);
  } catch (error) {
    next(error);
  }
});
*/
router.post('/events/:id/delete', async (req, res, next) => {
  try {
    const { id } = req.params;
    await Event.findByIdAndDelete(id);
    res.json({ message: 'Ok' });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
