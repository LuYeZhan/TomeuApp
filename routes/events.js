'use strict';

const express = require('express');
const Event = require('../models/Event');
const User = require('../models/User');
const router = express.Router();

router.get('/create', (req, res, next) => {
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
    res.redirect('/users/profile');
  } catch (error) {
    next(error);
  }
});

router.get('/:id/edit', async (req, res, next) => {
  try {
    const eventId = req.params.id;
    const event = await Event.findById(eventId);
    res.render('events/edit', event);
  } catch (error) {
    next(error);
  }
});

router.post('/:id/edit', async (req, res, next) => {
  const eventId = req.params.id;
  const { title, location, date, duration, attendees, description, menu, image } = req.body;
  const newEvent = {
    title,
    location,
    date,
    duration,
    attendees,
    description,
    menu,
    image
  };
  try {
    await Event.findByIdAndUpdate(eventId, newEvent);
    res.redirect('/users/profile');
  } catch (error) {
    next(error);
  }
});

router.get('/homepage', async (req, res, next) => {
  const userId = req.session.currentUser._id;
  const user = await User.findById(userId).populate('events');
  res.render('homepage', user);
  try {
    const userId = req.session.currentUser._id;
    const user = await User.findById(userId).populate('events');
    res.render('homepage', user);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
