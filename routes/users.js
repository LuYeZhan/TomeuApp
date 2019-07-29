'use strict';

const express = require('express');
const router = express.Router();
const User = require('../models/User.js');
const parser = require('../config/cloudinary');

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
});

router.get('/:id/update-profile', async (req, res, next) => {
  try {
    const userId = req.params.id;
    const user = await User.findById(userId);
    res.render('update-profile', user);
  } catch (error) {
    next(error);
  }
});

router.post('/:id/update-profile', parser.single('image'), async (req, res, next) => {
  const imageurl = req.file.secure_url;
  const userId = req.params.id;
  const { username, country, age, about, password } = req.body;
  const newUser = {
    username,
    country,
    age,
    about,
    password,
    image: imageurl
  };
  try {
    await User.findByIdAndUpdate(userId, newUser);
    res.redirect('/users/profile');
  } catch (error) {
    next(error);
  }
});

module.exports = router;
