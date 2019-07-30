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
    default: '../images/default-img-event.jpg'
  },
  events: [{
    type: ObjectId,
    ref: 'Event'
  }]
}, {
  timestamps: true
});

const User = mongoose.model('User', userSchema);

module.exports = User;
