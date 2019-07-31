'use strict';
const ObjectId = require('mongoose').Types.ObjectId;

const isLoggedIn = (req, res, next) => {
  if (req.session.currentUser) {
    return res.redirect('/');
  }
  next();
};

const isNotLoggedIn = (req, res, next) => {
  if (!req.session.currentUser) {
    return res.redirect('/');
  }
  next();
};

const isCorrectId = (req, res, next) => {
  const userId = req.params.id;
  if (!ObjectId.isValid(userId)) {
    return res.redirect('/homepage');
  }
  next();
};

const isFormFilled = (req, res, next) => {
  const { username, password } = req.body;
  if (!username || !password) {
    req.flash('errorFormNotFilled', 'All fields are required');
    if (username) {
      req.flash('errorDataform', username);
    }
    return res.redirect(req.originalUrl);
  }
  next();
};

module.exports = {
  isLoggedIn,
  isNotLoggedIn,
  isFormFilled,
  isCorrectId
};
