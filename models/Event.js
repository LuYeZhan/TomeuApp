'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const eventSchema = new Schema({
  title: {
    type: String,
    required: true,
    unique: true
  },
  location: {
    type: String,
    required: true
  },
  date: {
    type: Date
  },
  attendees: {
    type: Number
  },
  description: {
    type: String
  },
  duration: {
    type: Number,
    min: 0
  },
  image: {
    type: String,
    default: '/public/images/default-img-event.jpg'
  },
  carta: {

  },
  creator: String
});

const Event = mongoose.model('Event', eventSchema);

module.exports = Event;
