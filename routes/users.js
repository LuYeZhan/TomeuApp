<<<<<<< HEAD
var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
=======
'use strict';

const express = require('express');
const router = express.Router();
// const { isNotLoggedIn } = require('../middlewares/authMiddlewares.js');
const User = require('../models/User.js');

/* GET users listing. */
router.get('/profile', async (req, res, next) => {
  const userId = req.session.currentUser._id;
  const user = await User.findById(userId).populate('events');
  res.render('profile', user);
  try {
    const userId = req.session.currentUser._id;
    const user = await User.findById(userId).populate('events');
    res.render('profile', user);
  } catch (error) {
    next(error);
  }
>>>>>>> dev
});

module.exports = router;
