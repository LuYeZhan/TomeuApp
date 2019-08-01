'use strict';

const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/User.js');
const { isLoggedIn, isNotLoggedIn, isFormFilled } = require('../middlewares/authMiddlewares');
const saltRounds = 10;
const router = express.Router();

/* GET users listing. */
router.get('/signup', isLoggedIn, (req, res, next) => {
  const data = {
    messages: req.flash('errorFormNotFilled'),
    formData: req.flash('errorDataform')
  };
  res.render('signup', data);
});

router.post('/signup', isLoggedIn, isFormFilled, async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const salt = bcrypt.genSaltSync(saltRounds);
    const hashedPassword = bcrypt.hashSync(password, salt);

    const user = await User.findOne({ username });
    if (user) {
      return res.redirect('/auth/signup');
    }

    const newUser = await User.create({
      username,
      password: hashedPassword
    });
    // cualquier request que haga el ususario tiene objeto session
    req.session.currentUser = newUser; //
    res.redirect('/homepage');
  } catch (error) {
    console.log(error);
  }
});

router.get('/login', isLoggedIn, (req, res, next) => {
  res.render('login');
});

router.post('/login', isLoggedIn, isFormFilled, async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) {
      return res.redirect('/auth/login');
    };
    console.log(password, user);
    if (bcrypt.compareSync(password, user.password)) {
      req.session.currentUser = user;
      res.redirect('/homepage');
    } else {
      res.redirect('/auth/login');
    }
  } catch (error) {
    next(error);
  }
});

router.post('/logout', isNotLoggedIn, (req, res, next) => {
  delete req.session.currentUser;
  res.redirect('/');
});

module.exports = router;
