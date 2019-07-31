'use strict';

const express = require('express');
const router = express.Router();
const User = require('../models/User.js');
const parser = require('../config/cloudinary');
const { isNotLoggedIn, isCorrectId } = require('../middlewares/authMiddlewares.js');

/* GET users listing. */
router.get('/profile', isNotLoggedIn, async (req, res, next) => {
  try {
    const userId = req.session.currentUser._id;
    const user = await User.findById(userId)
      .populate({
        path: 'myevents',
        populate: {
          path: 'guests'
        }
      })
      .populate('events');
    // console.log(user.events[0].guests[0].username);
    res.render('profile', user);
  } catch (error) {
    next(error);
  }
});

router.get('/:id/update-profile', isNotLoggedIn, isCorrectId, async (req, res, next) => {
  try {
    const userId = req.params.id;
    const userFound = User.findById(userId);
    if (!userFound) {
      next();
    }
    const user = await User.findById(userId);
    res.render('update-profile', user);
  } catch (error) {
    next(error);
  }
});

router.post('/:id/update-profile', isNotLoggedIn, isCorrectId, parser.single('image'), async (req, res, next) => {
  const userId = req.params.id;

  let imageurl;
  if (req.file !== undefined) {
    imageurl = req.file.secure_url;
  } else {
    imageurl = '../images/profile-icon.png';
  }
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
}
);

router.post('/:id/delete', isNotLoggedIn, isCorrectId, async (req, res, next) => {
  const userId = req.params.id;
  try {
    await User.findByIdAndRemove(userId);
    delete req.session.currentUser;
    res.redirect('/');
  } catch (error) {
    next(error);
  }
});

module.exports = router;
