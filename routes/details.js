'use strict';

const express = require('express');
const Event = require('../models/Event');
const router = express.Router();

router.get('/:id', async (req, res, next) => {
  try {
    const eventId = req.params.id;
    const event = await Event.findById(eventId);
    res.render('details', event);
  } catch (error) {
    next(error);
  }
});

router.post('/:id', async (req, res, next) => {
  const eventId = req.params.id;
  const userId = req.session.currentUser._id;
  // const maxCapacity = await Event.find();
  // for (const event of maxCapacity) {
  //   if (event.attendees > req.body.attendees) {
  //     return res.redirect('/');
  //   }
  // }
  // const uniqueGuests = await Event.find();
  // for (const event of uniqueGuests) {
  //   if (event.uniqueGuests === req.body.guests) {
  //     return res.redirect('/homepage');
  //   }
  // }
  try {
    await Event.findByIdAndUpdate(eventId, { $push: { guests: userId } });
    res.redirect('/homepage');
  } catch (error) {
    next(error);
  }
});

module.exports = router;
