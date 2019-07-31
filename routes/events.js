'use strict';

const express = require('express');
const Event = require('../models/Event');
const User = require('../models/User');
const router = express.Router();
const parser = require('../config/cloudinary');
const { isNotLoggedIn, isCorrectId } = require('../middlewares/authMiddlewares.js');

router.get('/create', isNotLoggedIn, (req, res, next) => {
  res.render('events/create');
});

router.post('/create', isNotLoggedIn, parser.single('image'), async (req, res, next) => {
  let imageurl;
  const events = await Event.find();
  for (const event of events) {
    if (event.title === req.body.title) {
      return res.redirect('/events/create');
    }
  }
  console.log(req.file);
  if (req.file !== undefined) {
    imageurl = req.file.secure_url;
  } else {
    imageurl = '../images/default-img-event.jpg';
  }

  const { title, location, date, duration, attendees, description, menu } = req.body;

  try {
    const event = await Event.create({
      title,
      location,
      date,
      duration,
      attendees,
      description,
      menu,
      image: imageurl
    });
    const eventId = event._id;
    const userId = req.session.currentUser._id;
    await User.findByIdAndUpdate(userId, { $push: { myevents: eventId } });
    res.redirect('/users/profile');
  } catch (error) {
    next(error);
  }
});

router.get('/:id/edit', isNotLoggedIn, isCorrectId, async (req, res, next) => {
  try {
    const eventId = req.params.id;
    const event = await Event.findById(eventId);
    res.render('events/edit', event);
  } catch (error) {
    next(error);
  }
});

router.post('/:id/edit', isNotLoggedIn, isCorrectId, parser.single('image'), async (req, res, next) => {
  const eventId = req.params.id;
  let imageurl;
  if (req.file !== undefined) {
    imageurl = req.file.secure_url;
  } else {
    imageurl = '../images/default-img-event.jpg';
  }
  const { title, location, date, duration, attendees, description, menu } = req.body;
  const newEvent = {
    title,
    location,
    date,
    duration,
    attendees,
    description,
    menu,
    image: imageurl
  };
  try {
    await Event.findByIdAndUpdate(eventId, newEvent);
    res.redirect('/users/profile');
  } catch (error) {
    next(error);
  }
});

router.get('/homepage', isNotLoggedIn, async (req, res, next) => {
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
