'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  country: {
    type: String
  },
  age: {
    type: Number
  },
  about: {
    type: String
  },
  image: {
    type: String,
    default: '../images/profile-icon.png'
  },
  myevents: [{
    type: ObjectId,
    ref: 'Event'
  }],
  events: [{
    type: ObjectId,
    ref: 'Event'
  }]
}, {
  timestamps: true
});

const User = mongoose.model('User', userSchema);

module.exports = User;
