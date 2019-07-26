'use strict';

const express = require('express');
const bcrypt = require('bcrypt');

const User = require('../models/User.js');
const saltRounds = 10;
const router = express.Router();

/* GET users listing. */
router.get('/signup', (req, res, next) => {
  res.render('signup');
});

router.post('/signup', async (req, res, next) => {
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
    res.redirect('/');
  } catch (error) {
    console.log(error);
  }
});

router.get('/login', (req, res, next) => {
  res.render('login');
});

router.post('/login', async (req, res, next) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.redirect('/auth/login');
    }
    if (bcrypt.compareSync(password /* provided password */, user.password/* hashed password */)) {
      req.session.currentUser = user;
      res.redirect('/');
    } else {
      res.redirect('/auth/login');
    }
  } catch (error) {
    next(error);
  }
});

router.post('/logout', (req, res, next) => {
  delete req.session.currentUser;
  res.redirect('/');
});

module.exports = router;
