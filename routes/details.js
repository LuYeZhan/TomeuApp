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

module.exports = router;
