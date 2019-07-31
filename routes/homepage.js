'use strict';

const express = require('express');
// const User = require('../models/User.js');
const router = express.Router();
const Event = require('../models/Event');
const { isNotLoggedIn } = require('../middlewares/authMiddlewares.js');

router.get('/', isNotLoggedIn, async (req, res, next) => {
  try {
    // const userId = req.session.currentUser._id;
    // const user = await User.findById(userId).populate('events');
    const event = await Event.find();
    res.render('homepage', { event });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
