'use strict';

const express = require('express');

const Event = require('../models/Event');
const User = require('../models/User');
const router = express.Router();

router.get('create', (req, res, next) => {
  res.render('events/create');
});

router.post('/create', async (req, res, next) => {
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
    res.redirect('/');
  } catch (error) {
    next(error);
  }
});

module.exports = router;
