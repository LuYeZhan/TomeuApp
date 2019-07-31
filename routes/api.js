'use strict';

const express = require('express');
const router = express.Router();

const Event = require('../models/Event');
const User = require('../models/User');
const { isNotLoggedIn, isCorrectId } = require('../middlewares/authMiddlewares.js');

router.post('/events/:id/delete', isNotLoggedIn, isCorrectId, async (req, res, next) => {
  try {
    const { id } = req.params;
    await Event.findByIdAndDelete(id);
    res.json({ message: 'Ok' });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
