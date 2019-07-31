'use strict';

const express = require('express');
const router = express.Router();
const Event = require('../models/Event');
const User = require('../models/User');
const { isNotLoggedIn, isCorrectId } = require('../middlewares/authMiddlewares.js');

router.get('/:id', isNotLoggedIn, isCorrectId, async (req, res, next) => {
  try {
    const eventId = req.params.id;
    const event = await Event.findById(eventId);
    res.render('details', event);
  } catch (error) {
    next(error);
  }
});

router.post('/:id', isNotLoggedIn, isCorrectId, async (req, res, next) => {
  const eventId = req.params.id;
  const userId = req.session.currentUser._id;
  try {
    await Event.findByIdAndUpdate(eventId, { $push: { guests: userId } });
    await User.findByIdAndUpdate(userId, { $push: { events: eventId } });
    res.redirect('/homepage');
  } catch (error) {
    next(error);
  }
});

module.exports = router;
