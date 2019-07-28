'use strict';

const express = require('express');
const User = require('../models/User.js');
const router = express.Router();

router.get('/', async (req, res, next) => {
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
